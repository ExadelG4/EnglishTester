(function () {
    'use strict';

    angular.module('home', []);

    angular.module('home')
        .controller('homeController', ['$scope', '$state', 'userService',
            function($scope, $state, userService) {
                //userService.getAll().then(function (data) {
                //    $scope.all = data;
                //});
                //userService.getUsers().then(function (data) {
                //    $scope.users = data;
                //});
                //$scope.userName = 'Tina Kandelaki';
                //$scope.tchName = 'Jhon Tramb';

            }]);
})();
