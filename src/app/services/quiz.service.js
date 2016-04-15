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
        vm.editQuiz = editQuiz;
        
        ////////////////
        
        function getQuiz(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/searchById/' + id)
                .then(function(response) {
                    return serverQuizToClientQuiz(response.data);
                });
        }
        
        function editQuiz(id, clientQuiz) {
            var serverQuiz = clientQuizToServerQuiz(clientQuiz);
            serverQuiz.id = id;
            
            return $http
                .put(serverUrl + '/rest/secure/quiz/quizEdit', serverQuiz)
        }
        
        function createQuiz(clientQuiz) {
            return $http
                .post(serverUrl + '/rest/secure/quiz/quizsubmission', clientQuizToServerQuiz(clientQuiz))
        }
        
        function deleteQuiz(id) {
            return $http
                .delete(serverUrl + '/rest/secure/quiz/quizDelete/' + id);
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
                categories: [quiz.category],
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
            console.log(quiz);
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
