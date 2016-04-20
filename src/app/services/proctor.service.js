(function() {
    'use strict';
    
    angular
        .module('app')
        .service('proctorService', PoctorService);
    
    function PoctorService($http, serverUrl) {
        var self = this;
        
        self.startQuiz = startQuiz;
        self.stopQuiz = stopQuiz;
        
        ////////////////
        
        function startQuiz(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/activate/' + id);
        }
        
        function stopQuiz(id) {
            return $http
                .get(serverUrl + '/rest/secure/quiz/deactivate/' + id);
        }
    }
})();
