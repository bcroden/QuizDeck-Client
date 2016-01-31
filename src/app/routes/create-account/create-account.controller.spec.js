'use strict';

ngDescribe({
    name: 'Create Account Page',
    module: 'app',
    element: '<div ng-controller="createAccountController as ctrl"></div>',
    tests: function (deps) {
        it('controller is defined', function() {
            var ctrl = deps.element.controller();
            expect(ctrl).toBeDefined();
        });
    }
});
