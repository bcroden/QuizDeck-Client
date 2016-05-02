(function() {
    'use strict';
    
    angular
        .module('app')
        .component('accuracy', {
            controller: Controller,
            templateUrl: 'app/components/accuracy.html',
            bindings: {
                quizId: '='
            }
        })
    
    /* @ngInject */
    function Controller(completedQuizService) {
        var vm = this;
        
        vm.getAverageScore = getAverageScore;
        vm.getParticipants = getParticipants;
        vm.getParticipantGrade = getParticipantGrade;
        vm.getStyles = getStyles;
        vm.getQuestions = getQuestions;
        vm.getParticipantAnswers = getParticipantAnswers;
        
        vm.$onInit = function() {
            console.log(vm.quizId);
            
            completedQuizService
                .getAccuracy(vm.quizId)
                .then(function(response) {
                    vm.accuracyData = response;
                    console.log(response);
                });
        }
        
        ////////////////
        
        function getAverageScore() {
            try {
                return vm.accuracyData.stats["Average Accuracy Per Participant"]*100;
            }
            catch (e) {
                return "";
            }
        }
        
        function getQuestions() {
            try {
                return vm.accuracyData.questions;
            }
            catch (e) {
                return "";
            }
        }
        
        function getNumQuestions() {
            try {
                return vm.accuracyData.questions.length;
            }
            catch (e) {
                return "";
            }
        }
        
        function getParticipants() {
            try {
                return Object.keys(vm.accuracyData.data).sort();
            }
            catch (e) {
                return "";
            }
        }
        
        function getParticipantGrade(user) {
            try {
                return vm.accuracyData.data[user].stats["Accuracy Percentage"]*100;
            }
            catch (e) {
                return "";
            }
        }
        
        function getStyles(grade) {
            return {
                'grade-fail': grade < 70.0,
                'grade-ok': grade >= 70.0 && grade < 90.0,
                'grade-good': grade >= 90.0
            }
        }
        
        function getParticipantAnswers(user) {
            var answers = [];
            
            for(var i = 0; i < getNumQuestions(); i++) {
                try {
                    answers[i] = vm.accuracyData.data[user].data[i][0].selection.id;
                }
                catch (e) {
                    answers[i] = "";
                }
            }
            
            return answers;
        }
    }
})();
