(function () {
    'use strict';

    angular.module('statistic', []).controller('statisticController', ['$scope', '$state', 'userService', function($scope, $state, userService) {

        $scope.searchList = [];
        $scope.show = false;
        $scope.searchUser = function() {
            $scope.searchList = [];
            if ($scope.searching.length >= 3) {
                userService.searchUser($scope.searching).then(function(data) {
                        $scope.show = true;
                        data.forEach(function(item, i) {
                            $scope.searchList[i] = item;
                            $scope.searchList[i].fullName = item.firstName + ' ' + item.lastName;
                        });
                });
            }
        };

        $scope.showInfo = function(item) {
           userService.showInfoProfile(item._id).then(function(data) {

           })
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