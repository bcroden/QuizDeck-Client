'use strict';

console.log('Starting Gulp...');

// Node APIs
var exec         = require('child_process').exec;
var path         = require('path');

// Node Modules
var gulp         = require('gulp');
var $            = require('gulp-load-plugins')({lazy: false});

var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync');
var del          = require('del');
var runSequence  = require('run-sequence');
var Server       = require('karma').Server;

var out = './public/';
var src = './src/';
var tmp = './.tmp/';
var lib = './lib/';

var env = 'prod';

gulp.task('clean', function() {
    del.sync(out);
    del.sync(tmp);
});

gulp.task('vendor', function() {
    return gulp
        .src([
            lib + '/js-xlsx/dist/xlsx.core.min.js',
            lib + '/jquery/dist/jquery.min.js',
            lib + '/materialize/dist/js/materialize.min.js',
            lib + '/angular/angular.min.js',
            lib + '/angular-route/angular-route.min.js',
            lib + '/angular-materialize/src/angular-materialize.js',
            lib + '/angular-file-saver/dist/angular-file-saver.bundle.min.js'
        ])
        .pipe($.concat('vendor.min.js'))
        .pipe(gulp.dest(out));
});

gulp.task('angular:config', function() {
    return gulp
        .src(src + '**/app.config.json')
        .pipe($.ngConfig('app.config', {
            environment: env,
            wrap: true
        }))
        .pipe($.rename('config.module.js'))
        .pipe(gulp.dest(tmp));
});

gulp.task('angular:template', function() {
    return gulp
        .src([
            src + '**/*.html',
            '!' + src + 'index.html'
        ])
        .pipe($.htmlmin({
            collapseWhitespace: true
        }))
        .pipe($.angularTemplatecache('templates.module.js', {
            module: 'app.templates',
            moduleSystem: 'IIFE',
            standalone: true
        }))
        .pipe(gulp.dest(tmp));
});

gulp.task('js', [
        'angular:config',
        'angular:template'
    ], function() {
    return gulp
        .src([
            tmp + 'config.module.js',
            tmp + 'templates.module.js',
            src + '**/*.module.js',
            src + '**/!(*.spec).js'
        ])
        .pipe($.sourcemaps.init())
            .pipe($.ngAnnotate())
            .pipe($.concat('app.min.js'))
            .pipe($.uglify())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(out));
});

gulp.task('html', function() {
   return gulp
       .src(src + 'index.html')
       .pipe($.htmlmin({
            collapseWhitespace: true
        }))
       .pipe(gulp.dest(out));
});

gulp.task('sass', function() {
    return gulp
        .src(src + '**/*.s@(a|c)ss')
        .pipe(injectSass(gulp.src(src + '**/_*.s@(a|c)ss')))
        .pipe($.sourcemaps.init())
            .pipe($.sass().on('error', function() {}))
            .pipe($.postcss([
                autoprefixer({browsers: ['last 2 versions']}),
            ]))
            .pipe($.concat('app.min.css'))
            .pipe($.cssnano())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(out));
});

gulp.task('build', function() {
    runSequence('clean', ['vendor', 'js', 'html', 'sass']);
});

gulp.task('test', ['build'], function() {
    karma(true);
});

gulp.task('tdd', ['build'], function() {
    karma(false);
});

gulp.task('server', function() {
    exec('node server.js', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('browser-sync', ['server'], function() {
    browserSync.create().init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*"],
        browser:"google chrome",
        port: 8081,
        online: true,
        notify: false
	});
});

gulp.task('watch', function() {
    $.watch([
        src + '**/*.html',
        src + '**/*.js',
        src + '**/*.json'
    ], function() {
        gulp.start('js');
    });
    $.watch(src + '**/*.html', function() {
        gulp.start('html');
    });
    $.watch(src + '**/*.s@(a|c)ss', function() {
        gulp.start('sass');
    });
});

gulp.task('default', function() {
    env = 'local';
    runSequence(['tdd', 'watch'], 'browser-sync')
});

////////////////

function karma(singleRun) {
    setTimeout(function() {
        return new Server({
            configFile: __dirname + '/karma.conf.js',
            singleRun: singleRun
        }).start();
    }, 1000); //Wait until files are compiled to start karma.
}

function injectSass(src) {
    return $.inject(src, {
        starttag: '/* inject:sass */',
        endtag: '/* endinject */',
        transform: function(filepath, file, index, length, targetFile) {
            var targetPath = path.dirname(targetFile.path);
            var filePath = path.dirname(file.path);

            if(filePath.includes(targetPath)) {
                var dir = filePath.replace(targetPath, '').substr(1);
                var name = path.basename(file.path);
                name = name.substr(1, name.length-6);
                if(dir !== '')
                    name = '/' + name;
                var loc = (dir !== '') ? dir + name : name;
                return '@import "' + loc.replace(/\\/g, '/') + '";';
            }
        }
    });
}