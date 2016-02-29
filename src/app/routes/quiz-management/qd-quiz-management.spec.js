'use strict';

ngDescribe({
    name: 'Quiz-Management',
    module: 'app',
    tests: function ($componentController, $rootScope) {
        var $ctrl;
        
        beforeEach(function() {
            $ctrl = $componentController('qdQuizManagement', {
                $scope: $rootScope.$new()
            });
        });
        
        it('controller is defined', function() {
            expect($ctrl).toBeDefined();
        });
    }
});
