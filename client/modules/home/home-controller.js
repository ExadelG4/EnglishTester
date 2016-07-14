(function () {
    'use strict';

    angular.module('home', []);

    angular.module('home')
        .controller('homeController', ['$scope', '$state', 'context', 'userService',
            function($scope, $state, context, userService) {
                $scope.role = context.getRole();
                
                userService.getAll().then(function (data) {
                    $scope.all = data;
                });
                userService.getUsers().then(function (data) {
                    $scope.users = data;
                });
            }]);
})();
