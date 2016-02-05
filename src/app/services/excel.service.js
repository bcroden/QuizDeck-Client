(function() {
    'use strict';
    
    angular
        .module('app')
        .service('excelService', excelService);
    
    function excelService(FileSaver, Blob) {
        this.download = download;
        
        ////////////////
        
        function download() {
            var workbook = {
                SheetNames: [],
                Sheets: {}
            }

            var data = [
                ['User', 'Grade'],
                ['Brandon', 100],
            ];

            var ws_name = "SheetJS";
            var ws = sheet_from_array_of_arrays(data);

            workbook.SheetNames.push(ws_name);
            workbook.Sheets[ws_name] = ws;
            
            /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
            var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
            var wbout = XLSX.write(workbook, wopts);

            /* the saveAs call downloads a file on the local machine */
            FileSaver.saveAs(new Blob([s2ab(wbout)], { type: "" }), "test.xlsx")
        }
        
        function datenum(v, date1904) {
            if (date1904) v += 1462;
            var epoch = Date.parse(v);
            return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        }
        
        /* Stolen verbatim from https://gist.github.com/SheetJSDev/88a3ca3533adf389d13c */
        function sheet_from_array_of_arrays(data, opts) {
            var ws = {};
            var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
            for (var R = 0; R != data.length; ++R) {
                for (var C = 0; C != data[R].length; ++C) {
                    if (range.s.r > R) range.s.r = R;
                    if (range.s.c > C) range.s.c = C;
                    if (range.e.r < R) range.e.r = R;
                    if (range.e.c < C) range.e.c = C;
                    var cell = { v: data[R][C] };
                    if (cell.v == null) continue;
                    var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                    if (typeof cell.v === 'number') cell.t = 'n';
                    else if (typeof cell.v === 'boolean') cell.t = 'b';
                    else if (cell.v instanceof Date) {
                        cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    }
                    else cell.t = 's';

                    ws[cell_ref] = cell;
                }
            }
            if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
            return ws;
        }

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        
        // Private functions
        this._datenum = datenum;
        this._sheet_from_array_of_arrays = sheet_from_array_of_arrays;
    }
})();
