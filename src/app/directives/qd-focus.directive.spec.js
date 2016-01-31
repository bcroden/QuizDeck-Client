'use strict';

ngDescribe({
    name: 'qd-focus',
    module: 'app',
    tests: function ($compile, $rootScope) {
        it('sets an element to be initially focused', function() {
            var elem = angular.element('<input type="text" qd-focus></input>');
            var spy = spyOn(elem[0], 'focus');
            
            var scope = $rootScope.$new();
            scope.$digest();
            $compile(angular.element(elem))(scope);
            
            expect(spy).toHaveBeenCalled();
        });
    }
});
