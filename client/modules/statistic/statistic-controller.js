(function () {
    'use strict';

    angular.module('statistic', []).controller('statisticController', ['$scope', '$state', 'userService', function($scope, $state, userService) {


        $scope.searchUser = function() {
            if ($scope.searching.length >= 3) {
                userService.searchUser($scope.searching).then(function(data) {
                    console.log(data);
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