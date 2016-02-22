'use strict';

describe('Route Auth Service', function () {
    var $rootScope;
    var $location;

    var authService;
    
    beforeEach(angular.mock.module('app'));

    beforeEach(angular.mock.inject(function (_$injector_) {
        var $injector = _$injector_;
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');

        authService = $injector.get('authService');
        var routeAuthService = $injector.get('routeAuthService');
        routeAuthService.init();

        spyOn(authService, 'isAuthenticated');
        spyOn(authService, 'hasRole');

        spyOn($location, 'path');
    }));

    it('allows authenticated users through', function () {
        authService.isAuthenticated.and.returnValue(true);
        authService.hasRole.and.returnValue(true);

        $rootScope.$emit('$routeChangeStart', {
            $$route: {
                authRole: 'User'
            }
        }, {});

        expect($location.path).not.toHaveBeenCalled();
    });
    
    it('respects user roles', function () {
        authService.isAuthenticated.and.returnValue(true);
        authService.hasRole.and.returnValue(false);

        $rootScope.$emit('$routeChangeStart', {
            $$route: {
                authRole: 'User'
            }
        }, {});

        expect($location.path).toHaveBeenCalled();
    });

    it('redirects unauthenticated users to default route', function () {
        authService.isAuthenticated.and.returnValue(false);
        authService.hasRole.and.returnValue(false);

        $rootScope.$emit('$routeChangeStart', {
            $$route: {
                authRole: 'User'
            }
        }, {});

        expect($location.path).toHaveBeenCalledWith('/login');
    });
    
    it('redirects unauthenticated users to custom route', function () {
        authService.isAuthenticated.and.returnValue(false);
        authService.hasRole.and.returnValue(false);

        $rootScope.$emit('$routeChangeStart', {
            $$route: {
                authRole: 'User',
                authRedirect: '/custom'
            }
        }, {});

        expect($location.path).toHaveBeenCalledWith('/custom');
    });
});
