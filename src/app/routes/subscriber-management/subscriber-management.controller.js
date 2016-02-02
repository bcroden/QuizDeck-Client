(function() {
    'use strict';

    angular
        .module('app')
        .controller('subscriberManagementController', subscriberManagementController);

    function subscriberManagementController($location) {
        this.accountSearch = accountSearch;
        
        //////////////
        
        function accountSearch(){
            if(this.accountSearch)
                $location.path('/account/' + this.accountSearch);
        }
    }
})();