(function() {
    'use strict';
    
    angular
        .module('app')
        .component('userEdit', {
            templateUrl: 'app/routes/user-edit/user-edit.html',
            controller: Controller,
            bindings: {
                userInfo: '='
            }
        })
   
   /* @ngInject */
   function Controller(userService, $location) {
       var vm = this;
       
       vm.save = save;
       
       vm.$onInit = function() {
           
       };
       
       vm.$onDestroy = function() {
           
       };
       
       //////////////
       
       function save() {
           return userService
            .updateUser({
                userName: vm.userInfo.userName,
                email: vm.userInfo.email,
                password: vm.password
            }).then(function() {
                $location.path('/');
            });
       }
   }
})();
