'use strict';

ngDescribe({
    name: 'Home Page',
    module: 'app',
    element: '<div ng-controller="subscriberManagementController as ctrl"></div>',
    inject: ['$location'],
    tests: function (deps) {
        beforeEach(function() {
            spyOn(deps.$location, 'path');
        });
        
        it('controller is defined', function() {
            var ctrl = deps.element.controller();
            expect(ctrl).toBeDefined();
        });
        
        it('allows you to search for accounts', function() {
            var ctrl = deps.element.controller();
            
            // test strings
            ctrl.accountId = '123';
            ctrl.accountSearch();
            
            expect(deps.$location.path).toHaveBeenCalledWith('/account/123');
            
            
            // test numbers
            ctrl.accountId = 123;
            ctrl.accountSearch();
            
            expect(deps.$location.path).toHaveBeenCalledWith('/account/123');
        });
        
        it('does not search if there is no accounts', function() {
            var ctrl = deps.element.controller();
            
            ctrl.accountId = null;
            ctrl.accountSearch();
            
            expect(deps.$location.path).not.toHaveBeenCalled();
        });
    }
});
