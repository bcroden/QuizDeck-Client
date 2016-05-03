(function () {
    'use strict';

    angular
        .module('app')
        .component('qdSubscriberManagement', {
            controller: Controller,
            templateUrl: 'app/routes/subscriber-management/qd-subscriber-management.html'
        });
        
      var listOfNames;
      var subscribers;
      var users;

    /* @ngInject */
    function Controller($location, $http, serverUrl) {

        var vm = this;
        this.getNames = getNames;
        
        vm.userSearch = userSearch;
        vm.onSubscribe = onSubscribe;
        vm.onUnsubscribe = onUnsubscribe;
        vm.clearSearch = clearSearch;
        
        clearSearch();
        
        function clearSearch(){
            listOfNames = [];
        }

        function getNames(){            
            return listOfNames;
        }
        
        function userSearch() {
            listOfNames = [];
            subscribers = [];
            users = [];
            
            
            if(vm.waiting)
                return;
                
            vm.waiting = true;
            
            if(this.userName){
               $http.get(serverUrl + "/rest/secure/user/findUser/" + vm.userName).then(function(foundUsers){
                   $http.get(serverUrl + '/rest/secure/user/getSubscriptions/').then(function(foundSubscriptions){
                         vm.waiting = false;
                         
                        subscribers = foundSubscriptions.data;
                        users = foundUsers.data;

                        users.forEach(function(name){  
                            if(subscribers.length != 0){ 
                                subscribers.forEach(function(subscribedUser){
                                    if(name.userName === subscribedUser){
                                        name.subscribed = true;
                                    }else if(name.subscribed != true){
                                        name.subscribed = false;
                                    }
                                });
                                listOfNames.push(name);
                            }else{
                                name.subscribed = false;
                                listOfNames.push(name);
                            }
                        });
                        
                   });
               })
               .catch(function(){
                   vm.waiting = false;
                   alert('The subscription failed');
               });
            }
                
        }
        
        function onUnsubscribe(name){
             if(vm.waiting)
                return;
                
            vm.waiting = true;
            
            $http.put(serverUrl = '/rest/secure/user/unSubscribe/' + name).then(function(response){
                
                vm.waiting = false;
                
                if(response.statusText === "OK"){
                    vm.userSearch();
                }else{
                    
                }
            })
            .catch(function(){
                vm.waiting = false;
            })
        }
        
        function onSubscribe(name){
            if(vm.waiting)
                return;
                
            vm.waiting = true;
            
            $http.put(serverUrl + '/rest/secure/user/subscribe/' + name).then(function(response){
                
                vm.waiting = false;
                
                if(response.statusText === "OK"){
                    vm.userSearch();
                }else{
                    
                }
            })
            .catch(function(){
                vm.waiting = false;
            })
        }

    }
})();