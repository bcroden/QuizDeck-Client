'use strict';

ngDescribe({
    name: 'Create Account Page',
    module: 'app',
    inject: ['authService', '$q', '$rootScope', '$location'],
    element: '<div ng-controller="createAccountController as ctrl"></div>',
    tests: function (deps) {
        it('controller is defined', function() {
            var ctrl = deps.element.controller();
            expect(ctrl).toBeDefined();
        });
        
        describe('createAccount()', function() {
            beforeEach(function() {
                spyOn(deps.$location, 'path');
            });
            
            it('redirects to /dashboard on success', function() {
                spyOn(deps.authService, 'createAccount').and.callFake(function() {
                    return deps.$q.when(true);
                });
                
                var ctrl = deps.element.controller();
                
                ctrl.createAccount({
                    username: "username",
                    password: "password",
                    email: "email"
                });
                
                deps.$rootScope.$apply();
                
                expect(deps.$location.path).toHaveBeenCalledWith('/dashboard');
            });
            
            it('does not redirect to /dashboard on failure', function() {
                spyOn(deps.authService, 'createAccount').and.callFake(function() {
                    return deps.$q.reject(false);
                });
                
                var ctrl = deps.element.controller();
                
                ctrl.createAccount({
                    username: "username",
                    password: "password",
                    email: "email"
                });
                
                deps.$rootScope.$apply();
                
                expect(deps.$location.path).not.toHaveBeenCalled();
            });
        });
    }
});
