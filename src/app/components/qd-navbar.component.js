(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdNavbar', {
            controller: Controller,
            templateUrl: 'app/components/qd-navbar.html'
        });
    
    /* @ngInject */
    function Controller(authService, $http, $interval, serverUrl) {
        this.siteName = 'QuizDeck';
        var vm = this;
        
        this.logout = authService.logout;
        this.isAuthenticated = authService.isAuthenticated;
        this.checkForActiveQuizzes = checkForActiveQuizzes;
        
        var dataFromServer;
        var numActiveQuizzes;
        
        checkForActiveQuizzes();
            
        vm.$onInit = function(){
            vm.checkActiveInterval = $interval(function(){
                checkForActiveQuizzes();
            }, 5000);
        }
        
        vm.$onDestroy = function(){
            $interval.cancel(vm.checkActiveInterval);
        }
            
        function checkForActiveQuizzes(){
            dataFromServer = {};
            
            if(authService.isAuthenticated()){
                $http.get(serverUrl + '/rest/secure/quiz/pollingQuizzes').then(function(response){
                    dataFromServer = response.data;
                    numActiveQuizzes = dataFromServer.length;
                    document.getElementById("activeQuizBadge").innerHTML = numActiveQuizzes;
                    document.getElementById("activeQuizBadgeMobile").innerHTML = numActiveQuizzes;
                });
            }
        }
    }
})();