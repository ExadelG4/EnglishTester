(function () {
    'use strict';

    angular.module('statistic', []).controller('statisticController', ['$scope', '$state', 'userService', function($scope, $state, userService) {

        $scope.searchList = [];

        $scope.searchUser = function() {
            $scope.searchList = [];
            if ($scope.searching.length >= 3) {
                userService.searchUser($scope.searching).then(function(data) {
                    data.forEach(function(item, i) {
                        $scope.searchList[i] = item;
                        $scope.searchList[i].fullName = item.firstName + ' ' + item.lastName;
                    });
                });
            }
        };


        $scope.items = [
            {
                name: 'kety'
            },
            {
                name: 'katy'
            },
            {
                name: 'kity'
            }

        ]
    }]);
})();