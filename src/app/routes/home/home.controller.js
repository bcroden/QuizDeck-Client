(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', HomeController);

    function HomeController($location) {
        this.quizSearch = quizSearch;
        
        //////////////
        
        function quizSearch() {
            if(this.quizCode)
                $location.path('/quiz/' + this.quizCode);
        }
    }
})();
