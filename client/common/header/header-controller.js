(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state', 'authService', 'navigationFactory',
            function($scope, $state, authService, navigationFactory) {
                $scope.logout = function () {
                    authService.logout();
                };
                
                $scope.headerMenu = navigationFactory.getNavigationMenu();
                $scope.smallMenu = $scope.headerMenu;
                $scope.isSmall = false;

                $scope.chooseSmall = function (menuItem) {
                    if (menuItem.tabs) {
                        $scope.smallMenu = menuItem.tabs;
                        setTimeout(function () {
                            $scope.isSmall = true;
                        }, 0);
                    } else {
                        $state.go(menuItem.state);
                        $scope.isSmall = false;
                    }
                };

                $scope.toggled = function (open) {
                    if (!open && $scope.isSmall == false) {
                        $scope.smallMenu = $scope.headerMenu;
                        // $scope.isSmall = false;
                    }
                };
            }
        ]);
})();