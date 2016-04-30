(function() {
    'use strict';
    
    angular
        .module('app')
        .service('proctorService', PoctorService);
    
    function PoctorService($http, serverUrl) {
        var self = this;
        
        self.startQuiz = startQuiz;
        self.stopQuiz = stopQuiz;
        self.questionDecrement = questionDecrement;
        self.questionIncrement = questionIncrement;
        
        ////////////////
        
        function startQuiz(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/activate/' + id);
        }
        
        function stopQuiz(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/deactivate/' + id);
        }
        
        function questionDecrement(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/questionDecrement/' + id);
        }
        
        function questionIncrement(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/questionIncrement/' + id);
        }
    }
})();
