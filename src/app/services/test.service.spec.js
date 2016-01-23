'use strict';

ngDescribe({
    name: 'Test Service',
    modules: 'app',
    tests: function(testService) {
        it('is a test', function() {
            expect(testService.func()).toBe(true);
        });
    }
});
