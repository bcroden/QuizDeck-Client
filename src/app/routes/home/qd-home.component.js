(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdHome', {
            controller: Controller,
            templateUrl: 'app/routes/home/qd-home.html'
        });
    
    /* @ngInject */
    function Controller($location, $http ,serverUrl) {
        var vm = this;
        
        vm.quizSearch = quizSearch;
        
        //////////////
        
        function quizSearch() {
            try {
                vm.quizCode = vm.quizCode.toUpperCase();
            }
            catch (e) {}
            
            if(vm.quizCode) {
                if(vm.quizCode.length === 8)
                    return $http
                        .get(serverUrl + '/rest/nonsecure/quiz/shortConvert/' + vm.quizCode)
                        .then(function(response){
                            if(response.data !== "null")
                                $location.path('/take/' + response.data);
                            else
                                vm.inputClass = 'invalid';
                        });
                else if (vm.quizCode.length === 24)
                    $location.path('/take/' + vm.quizCode);
                else
                    vm.inputClass = 'invalid';
            }
        }
    }
})();
