(function() {
    'use strict';
    
    angular
        .module('app')
        .component('takeQuiz', {
            templateUrl: 'app/routes/take-quiz/take-quiz.html',
            controller: Controller,
            bindings: {
            }
        })
   
   /* @ngInject */
   function Controller() {
       var vm = this;
       
       vm.$onInit = function() {
           
       };
       
       //////////////
       
   }
})();
