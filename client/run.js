(function () {
    angular.module('myApp')

        .run(['authService', '$location', '$rootScope', '$state',
            function (authService, $location, $rootScope) {
                $rootScope.isLoginPage = function () {
                    return $location.$$url === '/login';
                };

                authService.init();
                if (!authService.isAuthenticated) {
                    $location.path('/login');
                }

                $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    // event.preventDefault();
                   var role = JSON.parse(localStorage.getItem('context')).user.role;
                   var stateRoles = toState.role.slice();
                   var f = true;
                   stateRoles.forEach(function(element) {
                       if(role == element){
                           f = false;
                           $location.path(toState.url);
                        // event.preventDefault();
                        // $state.go('login');

                       }
                   });
                   if(f){
                       if (!authService.isAuthenticated) {
                            $location.path('/login');
                        }else{
                             $location.path('/home');
                        }
                      
                    // event.preventDefault();
                    // $state.go('home');
                   }
                   
                })




                

            }]);
})();