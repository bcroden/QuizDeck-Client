(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdQuizManagement', {
            controller: Controller,
            templateUrl: 'app/routes/quiz-management/qd-quiz-management.html',
        });
         
    /* @ngInject */
    function Controller($location, $http) {
        this.getFilteredQuizes = getFilteredQuizes;
        this.searchWithFilter = searchWithFilter;
        
        ////////////////
        
         var dataFromServer = {};
         var listOfData = {};
         $http.get('https://quizdeckserver.herokuapp.com/rest/secure/quiz/searchBySelf').then(function(responce) {
             dataFromServer = responce.data;
             dataFromServer.forEach(function(quiz){         
                quiz.categories.forEach(function(category){
                listOfData[category] = listOfData[category] || [];
                listOfData[category].push(quiz);
                });
             });
          });
         
        function searchWithFilter(){
            var searchFilter = this.searchCriteria;
            listOfData = {};
            $http.get('http://quizdeckserver.herokuapp.com/rest/secure/quiz/searchBySelf').then(function(responce) {
                 dataFromServer = responce.data;
                 dataFromServer.forEach(function(quiz){  
                     quiz.categories.forEach(function(category){
                          listOfData[category] = listOfData[category] || [];
                          if(searchFilter == null || searchFilter == ''){
                              listOfData[category].push(quiz);
                          }else{
                              if(quiz.labels == searchFilter){
                                 listOfData[category].push(quiz);
                              }
                          }
                    });
                });
            });
        }
        
        function getFilteredQuizes() { 
            return listOfData;
        }
     }
})();
