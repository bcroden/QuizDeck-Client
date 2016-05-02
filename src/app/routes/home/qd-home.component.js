(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdHome', {
            controller: Controller,
            templateUrl: 'app/routes/home/qd-home.html'
        });
    
    /* @ngInject */
    function Controller($location) {
        this.quizSearch = quizSearch;
        
        //////////////
        
        function quizSearch() {
            if(this.quizCode)
                $location.path('/take/' + this.quizCode);
        }
    }
})();
