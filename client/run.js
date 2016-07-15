(function () {
    angular.module('myApp')
        .run(['authService', '$location',
            function (authService, $location) {
                authService.init();

                if (!authService.isAuthenticated) {
                    $location.path('/login');
                }
                
            }]);
})();