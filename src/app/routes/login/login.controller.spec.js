'use strict';

ngDescribe({
    name: 'Login page',
    module: 'app',
    element: '<div ng-controller="loginController as ctrl"></div>',
    tests: function (deps) {
        it('controller is defined', function() {
            var ctrl = deps.element.controller();
            expect(ctrl).toBeDefined();
        });
    }
});
