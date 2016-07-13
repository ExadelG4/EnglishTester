(function () {
    'use strict';

    angular.module('infrastructure')
        .factory('jwtWrapperService', [
            function() {
                var wrapper = this;

                wrapper.applyHeader = applyHeader;

                return wrapper;
                
                function applyHeader() {
                    
                }
            }]);
})();