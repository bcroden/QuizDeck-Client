'use strict';

ngDescribe({
    name: 'Home Page',
    module: 'app',
    element: '<div ng-controller="homeController as ctrl"></div>',
    inject: ['$location'],
    tests: function (deps) {
        beforeEach(function() {
            spyOn(deps.$location, 'path');
        });
        
        it('allows you to search for quizzes', function() {
            var ctrl = deps.element.controller();
            
            // test strings
            ctrl.quizCode = '123';
            ctrl.quizSearch();
            
            expect(deps.$location.path).toHaveBeenCalledWith('/quiz/123');
            
            
            // test numbers
            ctrl.quizCode = 123;
            ctrl.quizSearch();
            
            expect(deps.$location.path).toHaveBeenCalledWith('/quiz/123');
        });
        
        it('does not search if there is no quizCode', function() {
            var ctrl = deps.element.controller();
            
            ctrl.quizCode = null;
            ctrl.quizSearch();
            
            expect(deps.$location.path).not.toHaveBeenCalled();
        });
    }
});
