(function() {
    'use strict';
    
    angular
        .module('app')
        .component('takeQuiz', {
            templateUrl: 'app/routes/take-quiz/take-quiz.html',
            controller: Controller,
            bindings: {
                id: '='
            }
        })
   
   /* @ngInject */
   function Controller($interval, proctorService) {
       var vm = this;
       
       vm.onAnswerClick = onAnswerClick;
       
       vm.$onInit = function() {
           vm.activeAnswer = -1;
           vm.currentQuestion = 0;
           
           vm.answers = ['A', 'B', 'C', 'D'];
           
        //    vm.updateQuestionNum = $interval(function() {
        //        proctorService
        //            .getCurrentQuestion(vm.id)
        //            .then(function(response) {
        //                vm.currentQuestion = response.data;
        //            });
        //    }, 500);
       };
       
       vm.$onDestroy = function() {
        //    $interval.cancel(vm.updateQuestionNum);
       };
       
       //////////////
       
       function onAnswerClick(answer) {
           vm.activeAnswer = answer;
           proctorService.submitAnswer(vm.id, vm.answers[vm.activeAnswer], 0);
       }
   }
})();
