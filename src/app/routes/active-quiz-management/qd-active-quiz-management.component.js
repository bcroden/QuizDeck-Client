(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdActiveQuizManagement', {
            controller: Controller,
            templateUrl: 'app/routes/active-quiz-management/qd-active-quiz-management.html'
        });
    
    /* @ngInject */
    function Controller($location, $http, $interval) {
        this.getActiveQuizzes = getActiveQuizzes;
        var vm = this;
        vm.returnActiveQuizzes = returnActiveQuizzes;
        vm.quizSearch = quizSearch;
        
        getActiveQuizzes();
        
        var dataFromServer = {};
            
        vm.$onInit = function(){
            vm.checkActiveInterval = $interval(function(){
                getActiveQuizzes();
             }, 30000);
       }
       
        vm.$onDestroy = function(){
            $interval.cancel(vm.checkActiveInterval);
        }
        
        function getActiveQuizzes() {
            if(vm.waiting)
                return;
            vm.waiting = true;
            
            dataFromServer = {};
            $http.get("https://quizdeckserver.herokuapp.com/rest/secure/quiz/pollingQuizzes").then(function(response){
                vm.waiting = false;
                dataFromServer = response.data;
                dataFromServer.forEach(function(quiz){
                   console.log(quiz); 
                });
            }).catch(function(){
                vm.waiting = false;
                console.log('The server had a problem returning active quizzes')
            });
        }
        
        function returnActiveQuizzes(){
            return dataFromServer;
        }
        
        function quizSearch(quizId) {
                $location.path('/take/' + this.quizCode);
        }
    }
})();