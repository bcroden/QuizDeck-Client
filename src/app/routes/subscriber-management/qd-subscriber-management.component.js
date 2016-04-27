(function () {
    'use strict';

    angular
        .module('app')
        .component('qdSubscriberManagement', {
            controller: Controller,
            templateUrl: 'app/routes/subscriber-management/qd-subscriber-management.html'
        });
        
      var dataFromServer = {};
      var listOfNames = {};

    /* @ngInject */
    function Controller($location, $http) {

        var vm = this;
        this.getNames = getNames;
        this.onSubscribe = onSubscribe;
        
        vm.userSearch = userSearch;

        function userSearch() {
            listOfNames = [];
            
            if(vm.waiting)
                return;
                
            vm.waiting = true;
            
            if(this.userName){
               $http.get("https://quizdeckserver.herokuapp.com/rest/secure/user/findUser/" + vm.userName).then(function(response){
                   vm.waiting = false;
                   dataFromServer = response.data
                   dataFromServer.forEach(function(name){
                       listOfNames.push(name.userName);
                                      console.log(listOfNames[0]);
                   });
               })
               .catch(function(){
                   vm.waiting = false;
               });
            }
                
        }
        
        function getNames(){            
            return listOfNames;
        }
        
        function onSubscribe(name){
            $http.get("https://quizdeckserver.herokuapp.com/rest/secure/user/subcribe/ryan").then(function(response){
               console.log(response); 
            });
        }
     }
})();