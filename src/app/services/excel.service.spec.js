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
        
        it('has a method to manage datenums', function() {
            expect(excelService._datenum(10000)).toBe(2958466);
            expect(excelService._datenum(10000, true)).toBe(3492451);
        });
        
        it('has a method to convert arrays', function () {
            var data = [
                [1, 2, 3],
                [true, false, null, "sheetjs"],
                ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
                ["baz", null, "qux"]
            ];

            var output = {
                "A1": {
                    "v": 1,
                    "t": "n"
                },
                "B1": {
                    "v": 2,
                    "t": "n"
                },
                "C1": {
                    "v": 3,
                    "t": "n"
                },
                "A2": {
                    "v": true,
                    "t": "b"
                },
                "B2": {
                    "v": false,
                    "t": "b"
                },
                "D2": {
                    "v": "sheetjs",
                    "t": "s"
                },
                "A3": {
                    "v": "foo",
                    "t": "s"
                },
                "B3": {
                    "v": "bar",
                    "t": "s"
                },
                "C3": {
                    "v": 41689.604166666664,
                    "t": "n",
                    "z": "m\/d\/yy"
                },
                "D3": {
                    "v": "0.3",
                    "t": "s"
                },
                "A4": {
                    "v": "baz",
                    "t": "s"
                },
                "C4": {
                    "v": "qux",
                    "t": "s"
                },
                "!ref": "A1:D4"
            }
            
            expect(excelService._sheet_from_array_of_arrays(data)).toEqual(output);
        });
    }
});
