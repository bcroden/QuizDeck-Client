'use strict';

describe('Login Page', function() {
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

        $ctrl = $componentController('qdLogin', {
            $scope: $rootScope.$new()
        });
        spyOn($location, 'path');
    }));

    it('controller is defined', function() {
        expect($ctrl).toBeDefined();
    });

    describe('login()', function() {
        it('redirects to / on success', function() {
            spyOn(authService, 'login').and.callFake(function() {
                return $q.when(true);
            });

            $ctrl.login({
                "username": "username",
                "password": "password"
            });

            $rootScope.$apply();

            expect($location.path).toHaveBeenCalledWith('/');
        });

        it('does not redirect to / on failure', function() {
            spyOn(authService, 'login').and.callFake(function() {
                return $q.reject(false);
            });

            $ctrl.login({
                "username": "username",
                "password": "password"
            });

            $rootScope.$apply();

            expect($location.path).not.toHaveBeenCalled();
        });
    });
});

