'use strict';

ngDescribe({
    name: 'Home Page',
    module: 'app',
    tests: function ($componentController, $location, $rootScope) {
        var $ctrl;
        
        beforeEach(function() {
            $ctrl = $componentController('qdHome', {
                $scope: $rootScope.$new()
            });
            spyOn($location, 'path');
        });
        
        it('controller is defined', function() {
            expect($ctrl).toBeDefined();
        });
        
        it('allows you to search for quizzes', function() {
            // test strings
            $ctrl.quizCode = '123';
            $ctrl.quizSearch();
            
            expect($location.path).toHaveBeenCalledWith('/take/123');
            
            
            // test numbers
            $ctrl.quizCode = 123;
            $ctrl.quizSearch();
            
            expect($location.path).toHaveBeenCalledWith('/take/123');
        });
        
        it('does not search if there is no quizCode', function() {
            $ctrl.quizCode = null;
            $ctrl.quizSearch();
            
            expect($location.path).not.toHaveBeenCalled();
        });
    }
});
