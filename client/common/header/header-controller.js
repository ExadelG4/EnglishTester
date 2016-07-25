(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state', 'authService', 'navigationFactory',
            function($scope, $state, authService, navigationFactory) {
                $scope.logout = function () {
                    authService.logout();
                };
                
                $scope.headerMenu = navigationFactory.getNavigationMenu();

                $scope.isShowSmallNav = true;
                
                $scope.selectMenu = function (menuItem) {
                    if (menuItem.state) {
                        $scope.isShowSmallNav = false;
                        $state.go(menuItem.state);
                        setTimeout(function() {
                            $scope.isShowSmallNav = true;
                        }, 0);
                    }
                };
            }
        ]);
})();