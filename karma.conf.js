module.exports = function(config) {
    'use strict';
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec', 'coverage'],
        browsers: ['PhantomJS'],
        preprocessors: {
            './src/**/!(*.spec|config.module|templates.module).js': ['coverage']
        },
        files: [
            './lib/angular/angular.js',

            './node_modules/angular-mocks/angular-mocks.js',
            './node_modules/ng-describe/dist/ng-describe.js',

            './.tmp/**/config.module.js',
            './.tmp/**/templates.module.js',
            './src/**/*.module.js',
            './src/**/!(*.spec).js',
            './src/**/*.spec.js'
        ],
        logLevel: config.LOG_WARN,
        coverageReporter: {
            dir : 'coverage/',
            reporters: [{
                type: 'html',
                subdir: 'html'
            },{
                type: 'lcov',
                subdir: 'lcov'
            }]
        }
    });
};
