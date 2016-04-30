'use strict';

describe('Subscriber Management Page', function() {
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

        $ctrl = $componentController('qdSubscriberManagement', {
            $scope: $rootScope.$new()
        });
        spyOn($location, 'path');
    }));

    it('controller is defined', function() {
        expect($ctrl).toBeDefined();
    });

    // describe('userSearch()', function() {
    //     it('allows you to search for users', function() {
    //          // test strings
    //         $ctrl.userId = '123';
    //         $ctrl.userSearch();
            
    //         expect($location.path).toHaveBeenCalledWith('/user/123');
            
            
    //         // test numbers
    //         $ctrl.userId = 123;
    //         $ctrl.userSearch();
            
    //         expect($location.path).toHaveBeenCalledWith('/user/123');
    //     });

    //     it('does not search if there is no userId', function() {
    //         $ctrl.userId = null;
    //         $ctrl.userSearch();
            
    //         expect($location.path).not.toHaveBeenCalled();
    //     });

    // });
});