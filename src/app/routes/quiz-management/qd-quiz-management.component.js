(function() {
    'use strict';
    
    angular
        .module('app')
        .component('qdQuizManagement', {
            controller: Controller,
            templateUrl: 'app/routes/quiz-management/qd-quiz-management.html'
        });
    
    /* @ngInject */
    function Controller($location) {
        this.getQuizes = getQuizes;
        this.labelSearch = labelSearch;
        
        ////////////////
        
        function getQuizes() {
            return ["Catagory1", "Catagory2", "Catagory3"];
        }
        
        function labelSearch(){
            if(this.quizLabel)
                this.quizLable = null; //Get all the quizes with labels
        }
        
     }
})();
