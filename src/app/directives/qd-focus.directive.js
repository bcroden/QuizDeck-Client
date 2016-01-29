(function() {
    'use strict';

    angular
        .module('app')
        .directive('qdFocus', qdFocus);
    
    function qdFocus() {
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;
        
        function link(scope, element, attrs) {
            element.focus();
        }
    }
})();
