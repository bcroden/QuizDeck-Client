(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdDashboard', {
            controller: Controller,
            templateUrl: 'app/routes/dashboard/qd-dashboard.html'
        });
    
    /* @ngInject */
    function Controller() {
    }
})();
