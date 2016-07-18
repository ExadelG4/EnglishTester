(function () {
    angular.module('myApp')
        .run(['authService', '$location', '$rootScope',
            function (authService, $location, $rootScope) {
                $rootScope.isLoginPage = function () {
                    return $location.$$url === '/login';
                };


                authService.init();
                if (!authService.isAuthenticated) {
                    $location.path('/login');
                }
            }]);
})();