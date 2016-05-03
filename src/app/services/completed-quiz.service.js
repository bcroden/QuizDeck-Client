(function() {
    'use strict';
    
    angular
        .module('app')
        .service('completedQuizService', CompletedQuizService);
    
    function CompletedQuizService($http, serverUrl) {
        var self = this;
        
        self.getCompletedQuizzes = getCompletedQuizzes;
        self.getAccuracy = getAccuracy;
        self.getIndecisiveness = getIndecisiveness;
        
        ////////////////
        
        function getCompletedQuizzes() {
            return $http
                .get(serverUrl + '/rest/secure/quiz/getCompleteQuizzes')
                .then(function(response){
                    return response.data;
                });
        }
        
        function getAccuracy(id) {
            return $http
                .get(serverUrl + '/rest/secure/analysis/accuracy/' + id)
                .then(function(result){
                    return result.data;
                });
        }
        
        function getIndecisiveness(id) {
            return $http
                .get(serverUrl + '/rest/secure/analysis/indecisiveness/' + id)
                .then(function(result){
                    return result.data;
                });
        }
    }
})();
