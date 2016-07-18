(function () {
    angular.module('myApp')
        .run(['$rootScope', 'authService', '$location', '$state',
            function ($rootScope, authService, $location, $state) {
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
                       $location.path('/login');
                    // event.preventDefault();
                    // $state.go('home');
                   }
                   
                })




                
            }]);
})();