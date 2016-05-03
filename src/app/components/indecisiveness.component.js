(function() {
    'use strict';
    
    angular
        .module('app')
        .component('indecisiveness', {
            controller: Controller,
            templateUrl: 'app/components/indecisiveness.html',
            bindings: {
                title: '=',
                quizId: '='
            }
        })
    
    /* @ngInject */
    function Controller($timeout, completedQuizService) {
        var vm = this;
        
        vm.getParticipants = getParticipants;
        vm.getQuestions = getQuestions;
        vm.getNumQuestions = getNumQuestions;
        vm.getParticipantIndecisiveness = getParticipantIndecisiveness;
        vm.getExcelTitle = getExcelTitle;
        
        vm.$onInit = function() {
            console.log(vm.quizId);
            
            completedQuizService
                .getIndecisiveness(vm.quizId)
                .then(function(response) {
                    vm.data = response;
                    console.log(response);
                });
        }
        
        vm.$postLink = function() {
            $timeout(function() {
                $(document).ready(function(){
                    $('.tooltipped').tooltip({delay: 50});
                });
            }, 1000)
        }
        
        ////////////////
        
        function getQuestions() {
            try {
                return vm.data.questions;
            }
            catch (e) {
                return "";
            }
        }
        
        function getNumQuestions() {
            try {
                return vm.data.questions.length;
            }
            catch (e) {
                return "";
            }
        }
        
        function getParticipants() {
            try {
                return Object.keys(vm.data.data).sort();
            }
            catch (e) {
                return "";
            }
        }
        
        function getParticipantIndecisiveness(user) {
            var answers = [];
            
            for(var i = 0; i < getNumQuestions(); i++) {
                try {
                    answers[i] = vm.data.data[user].stats['Indecisiveness Score for Q' + i];
                    console.log(answers[i]);
                }
                catch (e) {
                    answers[i] = "";
                }
            }
            
            return answers;
        }
        
        function getExcelTitle() {
            return vm.title + '-Indecisiveness';
        }
    }
})();
