(function () {
    'use strict';

    angular.module('home', []);

    angular.module('home')
        .controller('homeController', ['$scope', '$state', 'authContext', 'authService',
            function($scope, $state, authContext, authService) {
                $scope.role = authContext.getRole();
                
                authService.getAll().then(function (data) {
                    $scope.all = data;
                });
                authService.getUsers().then(function (data) {
                    $scope.users = data;
                });
            }]);
})();
