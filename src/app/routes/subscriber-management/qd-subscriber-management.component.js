(function () {
    'use strict';

    angular
        .module('app')
        .component('qdSubscriberManagement', {
            controller: Controller,
            templateUrl: 'app/routes/subscriber-management/qd-subscriber-management.html'
        });

    /* @ngInject */
    function Controller($location) {

        this.userSearch = userSearch;

        function userSearch() {
            if(this.userId){
                $location.path('/user/' + this.userId);
            }

        }
     }
})();