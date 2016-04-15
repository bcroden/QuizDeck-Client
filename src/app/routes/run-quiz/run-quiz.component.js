(function() {
    'use strict';
    
    angular
        .module('app')
        .component('runQuiz', {
            templateUrl: 'app/routes/run-quiz/run-quiz.html',
            controller: Controller,
            bindings: {
                quiz: '=?'
            }
        })
   
   /* @ngInject */
   function Controller(proctorService, $routeParams, $interval) {
       var vm = this;
       
       vm.nextQuestion = nextQuestion;
       vm.startQuiz = startQuiz;
       vm.stopQuiz = stopQuiz;
       vm.getTime = getTime;
       
       vm.$onInit = function() {
           vm.firstTime = true;
           vm.currentNumber = 0;
           vm.id = $routeParams.id;
           
           vm.isRunning = false;
           vm.time = 0;
       };
       
       //////////////
       
       function nextQuestion() {
           vm.currentNumber++
       }
       
       function startTimer() {
           vm.time = 0;
           vm.timerInterval = $interval(function() {
               if(vm.isRunning) {
                   vm.time += 100;
               }
           }, 100);
       }
       
       function stopTimer() {
           $interval.cancel(vm.timerInterval);
       }
       
       function getTime() {
           var seconds = Math.floor(vm.time / 1000);
           
           return seconds + ' seconds';
       }
       
       function startQuiz() {
           return proctorService
               .startQuiz(vm.id)
               .then(function() {
                   vm.isRunning = true;
                   vm.firstTime = false;
                   startTimer()
               });
       }
       
       function stopQuiz() {
           return proctorService
               .stopQuiz(vm.id)
               .then(function() {
                   vm.isRunning = false;
                   stopTimer()
               });
       }
   }
})();
