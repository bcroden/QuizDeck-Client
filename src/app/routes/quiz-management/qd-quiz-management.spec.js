'use strict';

describe('Quiz-Management Page', function(){
    var $ctrl;

    var $rootScope;
    var $location;
    var $q;
    
      var authService;
    
     beforeEach(angular.mock.module('app'));
     
     beforeEach(angular.mock.inject(function(_$injector_) {
        var $injector = _$injector_;
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        var $componentController = $injector.get('$componentController');
        $q = $injector.get('$q');

        authService = $injector.get('authService');

        $ctrl = $componentController('qdQuizManagement', {
            $scope: $rootScope.$new()
        });
        spyOn($location, 'path');
    }));
    
     it('controller is defined', function() {
        expect($ctrl).toBeDefined();
    });

    // describe('searchWithFilter()', function(){
    //     it('sets a list of quizzes', function(){
    //         spyOn(authService, 'searchWithFilter').and.callFake(function() {
    //             return $q.when(true);
    //         });
            
    //         $ctrl.searchWithFilter(
    //             listOfData["string"].push([
    //             {
    //                 "categories": [
    //                 "string"
    //                 ],
    //                 "id": "string",
    //                 "labels": [
    //                 "string"
    //                 ],
    //                 "owner": "string",
    //                 "publicAvailable": true,
    //                 "questions": [
    //                 {
    //                     "answers": [
    //                     {
    //                         "content": "string",
    //                         "id": "string"
    //                     }
    //                     ],
    //                     "correctAnswerID": "string",
    //                     "question": "string",
    //                     "questionFormat": "string",
    //                     "questionNum": 0
    //                 }
    //                 ],
    //                 "title": "string"
    //             }
    //             ])
    //         );
    //         expect($ctrl.listOfData).toBeDefined();
    //     })
    // })
});