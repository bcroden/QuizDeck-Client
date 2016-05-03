(function() {
    'use strict';

    angular
        .module('app')
        .service('dateService', DateService);

    function DateService() {
        this.toString = toString;

        ////////////////

        function toString(date) {
            var month = date.getMonth()+1;
            var day = date.getDate();
            var year = date.getFullYear();
            
            var hours = date.getHours();
            hours = (hours < 10) ? '0' + hours : hours;
            var minutes = date.getMinutes()
            minutes = (minutes < 10) ? '0' + minutes : minutes;
            
            return month + "/" + day + '/' + year + ' ' + hours + ':' + minutes;
        }
    }
})();
