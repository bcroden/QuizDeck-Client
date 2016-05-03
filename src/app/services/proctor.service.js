(function() {
    'use strict';
    
    angular
        .module('app')
        .service('proctorService', PoctorService);
    
    function PoctorService($http, $q, $window, serverUrl, authService) {
        var self = this;
        
        self.startQuiz = startQuiz;
        self.stopQuiz = stopQuiz;
        self.questionDecrement = questionDecrement;
        self.questionIncrement = questionIncrement;
        self.getSubmissions = getSubmissions
        self.submitAnswer = submitAnswer;
        self.getCurrentQuestion = getCurrentQuestion;
        self.finishQuiz = finishQuiz;
        
        ////////////////
        
        function startQuiz(id, isPublic) {
            return $http
                .put(serverUrl + '/rest/secure/quiz/activate/', {
                    publicAvailable: isPublic,
                    quizId: id
                });
        }
        
        function stopQuiz(id) {
            return $http
                .put(serverUrl + '/rest/secure/quiz/deactivate/' + id);
        }
        
        function questionDecrement(id) {
            return $http
                .put(serverUrl + '/rest/secure/quiz/questionDecrement/' + id);
        }
        
        function questionIncrement(id) {
            return $http
                .put(serverUrl + '/rest/secure/quiz/questionIncrement/' + id);
        }
        
        function getSubmissions(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/viewSubmissions/' + id)
                .then(function(response) {
                    var data = response.data || [];
                    
                    var questions = [];
                    var answers = [];
                    var lengths = [];
                    
                    data.forEach(function(submission) {
                        var user = submission.userName;
                        var lastGuess = submission.guesses[submission.guesses.length-1];
                        
                        lengths[submission.questionNum] = submission.question.answers.length;
                        answers[lastGuess.questionNum] = answers[lastGuess.questionNum] || {};
                        answers[lastGuess.questionNum][user] = lastGuess.selection.id;
                    });
                    
                    answers.forEach(function(answer, index) {
                        questions[index] = questions[index] || {}
                        for(var i = 0; i < lengths[index]; i++) {
                            var letter = String.fromCharCode(65 + i);
                            questions[index][letter] = 0;
                        }
                        
                        for(var user in answer) {
                            questions[index][answer[user]] = questions[index][answer[user]] || 0;
                            questions[index][answer[user]]++
                        }
                    });
                    
                    return questions;
                });
        }
        
        function finishQuiz(id) {
            return $q
                .all({
                    deacivate: stopQuiz(id),
                    quiz: $http.get(serverUrl + '/rest/secure/quiz/searchById/' + id),
                    // submissions: $http.get(serverUrl + '/rest/secure/quiz/viewSubmissions/' + id)
                })
                .then(function(values) {
                    var quiz = values.quiz.data;
                    // var submissions = values.submissions.data;
                    
                    console.log(quiz);
                    // console.log(submissions);
                    
                    return $http.post(serverUrl + '/rest/secure/quiz/submit', {
                        quizId: id,
                        quiz: quiz,
                        // submissions: submissions
                    });
                });
        }
        
        function getCurrentQuestion(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/getQuestionNum/' + id);
        }
        
        function submitAnswer(id, answer, question) {
            var url;
            var user;
            if(authService.isAuthenticated()) {
                url = serverUrl + '/rest/secure/quiz/submission';
                user = authService.getPayload().user;
            }
            else {
                url = serverUrl + '/rest/nonsecure/quiz/submission';
                
                user = $window.localStorage.anonUsername;
                if(!user)
                    user = Math.floor(Math.random()*100000000);
                $window.localStorage.anonUsername = user;
            }
            
            return $http
                .post(url, {
                    chosenAnswer: answer,
                    chosenAnswerContent: "",
                    questionNum: question,
                    quizID: id,
                    userName: user
                });
        }
    }
})();
