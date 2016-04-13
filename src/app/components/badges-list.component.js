(function() {
    'use strict';
    
    angular
        .module('app')
        .component('badgesList', {
            controller: Controller,
            templateUrl: 'app/components/badges-list.html',
            bindings: {
                chips: '<',
                onDelete: '<',
            }
        })
    
    /* @ngInject */
    function Controller() {
        var vm = this;
        
        vm.chips = vm.chips || [];
        
        vm.delete = vm.onDelete || function(index) {
            vm.chips.splice(index, 1);
        }
    }
})();
