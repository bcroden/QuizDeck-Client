'use strict';

ngDescribe({
    name: 'Excel Service',
    modules: 'app',
    tests: function(excelService, FileSaver) {
        beforeEach(function() {
            FileSaver.saveAs = jasmine.createSpy();
        });
        
        it('downloads an excel file', function() {
            excelService.download();
            expect(FileSaver.saveAs).toHaveBeenCalled();
        });
    }
})
