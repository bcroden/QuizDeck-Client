'use strict';

ngDescribe({
    name: 'qd-enter',
    module: 'app',
    element: '<div ng-init="val = 0" qd-enter="val = 1"></div>',
    tests: function (deps) {
        it('executes expressions on enter keydown', function() {
            deps.element.scope().val = 0;
            deps.element.trigger({
                type: "keydown",
                which: 13
            });
            expect(deps.element.scope().val).toBe(1);
        });
        
        it('executes expressions on enter keypress', function() {
            deps.element.scope().val = 0;
            deps.element.trigger({
                type: "keypress",
                which: 13
            });
            expect(deps.element.scope().val).toBe(1);
        });
        
        it('does not execute expressions on non-enter keydown', function() {
            deps.element.scope().val = 0;
            deps.element.trigger({
                type: "keydown",
                which: 12
            });
            expect(deps.element.scope().val).toBe(0);
        });
        
        it('does not execute expressions on non-enter keypress', function() {
            deps.element.scope().val = 0;
            deps.element.trigger({
                type: "keypress",
                which: 12
            });
            expect(deps.element.scope().val).toBe(0);
        });
    }
});
