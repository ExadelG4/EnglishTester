(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state', 'authService', 'navigationFactory',
            function($scope, $state, authService, navigationFactory) {
                $scope.logout = function () {
                    authService.logout();
                };
                
                $scope.headerMenu = navigationFactory.getNavigationMenu();

                $scope.hui = true;
                
                $scope.selectMenu = function (menuItem) {
                    if (menuItem.state) {
                        $scope.hui = false;
                        $state.go(menuItem.state);
                        setTimeout(function() {
                            $scope.hui = true;
                        }, 0);
                    }
                };
            }
        ]);
})();