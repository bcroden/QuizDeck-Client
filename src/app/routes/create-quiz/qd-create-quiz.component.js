(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdCreateQuiz', {
            controller: Controller,
            templateUrl: 'app/routes/create-quiz/qd-create-quiz.html',
            bindings: {
                categories: '=?',
                quiz: '=?'
            }
        });
    
    /* @ngInject */
    function Controller(quizService, $routeParams) {
        var vm = this;
        
        /**
         * Setup defaults for category and quiz data.
         */
        vm.$onInit = function() {
            vm.categories = vm.categories || ['Science', 'History'];
        
            vm.quiz = vm.quiz || {
                title: '',
                category: '',
                labels: [],
                questions: [{
                    text: '',
                    answers: [
                        {
                            value: '',
                            correct: true
                        }
                    ]
                }]
            };
        }
        
        vm.addQuestion = function() {
            vm.quiz.questions.push({
                text: '',
                answers: [{
                    value: '',
                    correct: false
                }]
            });
        }
        
        vm.addAnswer = function(question) {
            question.answers.push({
                value: '',
                correct: false
            });
        }
        
        vm.deleteQuestion = function(index) {
            vm.quiz.questions.splice(index, 1);
        }
        
        vm.deleteAnswer = function(question, index) {
            question.answers.splice(index, 1);
        }
        
        vm.saveQuiz = function() {
            console.log(vm.quiz);
            quizService.createQuiz(vm.quiz);
        }
        
        vm.deleteQuiz = function() {
            var id = $routeParams.id;
            
            quizService.deleteQuiz(id);
        }
    }
})();
