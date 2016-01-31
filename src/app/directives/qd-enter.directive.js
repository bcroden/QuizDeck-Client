(function() {
    'use strict';

    angular
        .module('app')
        .directive('qdEnter', qdEnter);
    
    function qdEnter() {
        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;
        
        function link(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if(event.which !== 13)
                    return;
                scope.$apply(function() {
                    scope.$eval(attrs.qdEnter);
                });
                event.preventDefault();
            });
        }
    }
})();
