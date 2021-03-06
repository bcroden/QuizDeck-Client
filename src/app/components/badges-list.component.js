(function() {
    'use strict';
    
    angular
        .module('app')
        .component('badgesList', {
            controller: Controller,
            templateUrl: 'app/components/badges-list.html',
            bindings: {
                chips: '=',
                onDelete: '<',
            }
        })
    
    /* @ngInject */
    function Controller() {
        var vm = this;
        
        vm.$onInit = function() {
            vm.chips = vm.chips.map(function(input){
                return {text: input};
            });
        }
        
        // vm.chips = vm.chips || [];
        
        vm.delete = vm.onDelete || function(index) {
            vm.chips.splice(index, 1);
        }
        
        vm.addChip = function() {
            if(!vm.newChip)
                return;
            
            vm.chips.push({text: vm.newChip});
            vm.newChip = '';
        }
    }
})();
