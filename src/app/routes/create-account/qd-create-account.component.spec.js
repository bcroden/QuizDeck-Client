'use strict';

describe('Create Account Page', function() {
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

        $ctrl = $componentController('qdCreateAccount', {
            $scope: $rootScope.$new()
        });
        spyOn($location, 'path');
    }));

    it('controller is defined', function() {
        expect($ctrl).toBeDefined();
    });

    describe('createAccount()', function() {
        it('redirects to / on success', function() {
            spyOn(authService, 'createAccount').and.callFake(function() {
                return $q.when(true);
            });

            $ctrl.createAccount({
                username: "username",
                password: "password",
                email: "email"
            });

            $rootScope.$apply();

            expect($location.path).toHaveBeenCalledWith('/');
        });

        it('does not redirect to / on failure', function() {
            spyOn(authService, 'createAccount').and.callFake(function() {
                return $q.reject(false);
            });

            $ctrl.createAccount({
                username: "username",
                password: "password",
                email: "email"
            });

            $rootScope.$apply();

            expect($location.path).not.toHaveBeenCalled();
        });
    });
});
