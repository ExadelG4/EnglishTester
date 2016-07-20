(function () {
    'use strict';

    angular.module('home', []);

    angular.module('home')
        .controller('homeController', ['$scope', '$state', 'userService', 'context',
            function($scope, $state, userService, context) {
                $scope.isAdmin = context.isAdmin;
                $scope.isUser = context.isUser;
                $scope.isTeacher = context.isTeacher;
                $scope.isGuest = context.isGuest;


                userService.getAll().then(function (data) {
                    $scope.all = data;
                });
                userService.getUsers().then(function (data) {
                    $scope.users = data;
                });
                $scope.userName = 'Tina Kandelaki';
                $scope.tchName = 'Jhon Tramb';
            }]);
})();
