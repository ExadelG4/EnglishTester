(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state', 'authService',
            function($scope, $state, authService) {
                $scope.isActiveTab = function (name) {
                    return $state.current.url.startsWith(name);
                };

                $scope.logout = function () {
                    authService.logout();
                };
            }]);
})();