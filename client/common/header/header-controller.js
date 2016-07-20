(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state', 'authService', 'navigationFactory',
            function($scope, $state, authService, navigationFactory) {
                $scope.logout = function () {
                    authService.logout();
                };
                
                $scope.headerMenu = navigationFactory.getNavigationMenu();
            }
        ]);
})();