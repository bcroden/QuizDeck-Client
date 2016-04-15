(function() {
    'use strict';
    
    angular
        .module('app')
        .config(config);
    
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<qd-home/>'
            })
            .when('/edit-quiz/:id?', {
                authRole: 'User',
                template: '<qd-create-quiz quiz="$resolve.quiz" categories="$resolve.categories"/>',
                resolve: {
                    quiz: getQuiz,
                    categories: getCategories
                }
            })
            .when('/create-account', {
                template: '<qd-create-account/>'
            })
            .when('/dashboard', {
                authRole: 'User',
                template: '<qd-dashboard/>'
            })
            .when('/quiz-management', {
                authRole: 'User',
                template: '<qd-quiz-management/>'
            })
            .when('/login', {
                template: '<qd-login/>'
            })
            .when('/subscriber-management',{
                template: '<qd-subscriber-management/>'
            })
            .when('/run-quiz/:id', {
                template: '<run-quiz quiz="$resolve.quiz"/>',
                resolve: {
                    quiz: getQuiz
                }
            })
            .otherwise('/');
        
        /* @ngInject */
        function getQuiz(quizService, $route) {
            var id = $route.current.params.id;
            if(id)
                return quizService.getQuiz(id);
        }
        
        /* @ngInject */
        function getCategories($q) {
            return $q.when(['Geography']);
        }
    }
})();
