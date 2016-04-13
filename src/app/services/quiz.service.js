(function() {
    'use strict';
    
    angular
        .module('app')
        .service('quizService', QuizService);
    
    function QuizService($http, serverUrl, $q, authService) {
        var vm = this;
        
        vm.getQuiz = getQuiz;
        vm.createQuiz = createQuiz;
        vm.deleteQuiz = deleteQuiz;
        
        ////////////////
        
        function getQuiz(id) {
            // TODO: Fix this when Cade adds an endpoint to get a single quiz...
            return $http
                .get(serverUrl + '/rest/secure/quiz/searchBySelf')
                .then(function(response) {
                    var quizzes = response.data || [];
                    
                    var quiz = quizzes.filter(function(quiz) {
                        return quiz.id === id;
                    })[0];
                    
                    return serverQuizToClientQuiz(quiz);
                });
        }
        
        function createQuiz(clientQuiz) {
            
            return $http
                .post(serverUrl + '/rest/secure/quiz/quizsubmission', clientQuizToServerQuiz(clientQuiz))
        }
        
        // TODO: The delete endpoint seems to be broken...
        function deleteQuiz(id) {
            return $http
                .delete(serverUrl + '/rest/secure/quiz/quizDelete', {
                    id: id
                });
        }
        
        function clientQuizToServerQuiz(quiz) {
            function convertLabels(labels) {
                var serverLabels = []

                labels.forEach(function(label) {
                    serverLabels.push(label.text);
                });

                return serverLabels;
            }

            function convertQuestions(questions) {
                questions = questions || [{
                    text: '',
                    answers: [
                        {
                            value: '',
                            correct: true
                        }
                    ]
                }];

                var serverQuestions = [];

                questions.forEach(function(question, index) {
                    var serverAnswers = [];
                    var correctAnswer;

                    question.answers.forEach(function(answer, index) {
                        serverAnswers.push({
                            content: answer.value,
                            id: index
                        });

                        if (answer.correct)
                            correctAnswer = index;
                    });

                    serverQuestions.push({
                        answers: serverAnswers,
                        correctAnswerID: correctAnswer,
                        question: question.text,
                        questionFormat: "string",
                        questionNum: index
                    });
                });

                return serverQuestions;
            }
            
            return {
                categories: quiz.categories || [],
                labels: convertLabels(quiz.labels) || [],
                owner: authService.getPayload().user,
                publicAvailable: quiz.publicAvailable || false,
                questions: convertQuestions(quiz.questions),
                title: quiz.title || ''
            };
        }
        
        function serverQuizToClientQuiz(quiz) {
            quiz = quiz || {};
            
            var clientQuiz = {
                title: '',
                category: '',
                labels: [],
                questions: []
            };
            
            clientQuiz.title = quiz.title;
            clientQuiz.category = quiz.categories[0];
            clientQuiz.labels = quiz.labels;
            
            quiz.questions.forEach(function(question) {
                var clientQuestion = {
                    text: question.question,
                    answers: []
                };
                
                question.answers.forEach(function(answer) {
                    clientQuestion.answers.push({
                        value: answer.content,
                        correct: false
                    });
                });
                
                clientQuestion.answers[question.correctAnswerID].correct = true;
                
                clientQuiz.questions.push(clientQuestion);
            });
            
            return clientQuiz;
        }
    }
})();
