'use strict';

ngDescribe({
    name: 'Dashboard',
    module: 'app',
    tests: function ($componentController, $rootScope) {
        var $ctrl;
        
        beforeEach(function() {
            $ctrl = $componentController('qdDashboard', {
                $scope: $rootScope.$new()
            });
        });
        
        it('controller is defined', function() {
            expect($ctrl).toBeDefined();
        });
    }
});
