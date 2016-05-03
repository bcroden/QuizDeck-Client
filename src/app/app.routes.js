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
            .when('/quiz-management', {
                authRole: 'User',
                template: '<qd-quiz-management/>'
            })
            .when('/login', {
                template: '<qd-login/>'
            })
            .when('/subscriber-management',{
                authRole: 'User',
                template: '<qd-subscriber-management/>'
            })
            .when('/active-quiz-management',{
                template: '<qd-active-quiz-management/>'
            })
            .when('/run-quiz/:id', {
                authRole: 'User',
                template: '<run-quiz quiz="$resolve.quiz"/>',
                resolve: {
                    quiz: getQuiz
                }
            })
            .when('/take/:id', {
                template: '<take-quiz id="$resolve.id"/>',
                resolve: {
                    id: getId
                }
            })
            .when('/completed-quizzes', {
                authRole: 'User',
                template: '<completed-quizzes completed-quizzes="$resolve.completedQuizzes"/>',
                resolve: {
                    completedQuizzes: getCompletedQuizzes
                }
            })
            .when('/quiz-results/:id', {
                authRole: 'User',
                template: '<quiz-results completed-quiz="$resolve.completedQuiz"/>',
                resolve: {
                    completedQuiz: getCompletedQuiz
                }
            })
            .when('/my-profile', {
                authRole: 'User',
                template: '<user-edit user-info="$resolve.userInfo"/>',
                resolve: {
                    userInfo: getUserInfo
                }
            })
            .otherwise('/');
        
        /* @ngInject */
        function getId($route) {
            return $route.current.params.id;
        }
        
        /* @ngInject */
        function getQuiz(quizService, $route) {
            var id = $route.current.params.id;
            if(id)
                return quizService.getQuiz(id);
        }
        
        /* @ngInject */
        function getCompletedQuizzes(completedQuizService) {
            return completedQuizService.getCompletedQuizzes();
        }
        
        /* @ngInject */
        function getCompletedQuiz(completedQuizService, $route) {
            return completedQuizService
                .getCompletedQuizzes()
                .then(function(response){
                    return response
                        .filter(function(quiz) {
                            return quiz.id === $route.current.params.id;
                        })[0];
                });
        }
        
        /* @ngInject */
        function getCategories($q) {
            return $q.when(['Geography']);
        }
        
        /* @ngInject */
        function getUserInfo(userService) {
            return userService.getUserInfo();
        }
    }
})();
