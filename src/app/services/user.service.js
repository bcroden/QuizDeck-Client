(function() {
    'use strict';
    
    angular
        .module('app')
        .service('userService', UserService);
    
    function UserService($http, serverUrl) {
        var self = this;
        
        self.getUserInfo = getUserInfo;
        self.updateUser = updateUser;
        
        ////////////////
        
        function getUserInfo() {
            return $http
                .get(serverUrl + '/rest/secure/user/findSelf')
                .then(function(response) {
                    console.log(response.data);
                    return response.data;
                });
        }
        
        function updateUser(data) {
            return $http
                .put(serverUrl + '/rest/secure/user/edit', data);
        }
    }
})();
