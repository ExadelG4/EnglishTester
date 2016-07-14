(function () {
    angular.module('myApp')
        .run(['authService',
            function (authService) {
                authService.init();
            }]);
})();