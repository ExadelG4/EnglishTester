(function () {
    'use strict';

    angular.module('statistic', []).controller('statisticController', ['$scope', '$state', 'userService', function($scope, $state, userService) {

        $scope.searchList = [];
        $scope.show = false;
        $scope.showUInfo = false;
        $scope.searchUser = function() {
            $scope.searchList = [];
            $scope.showUInfo = false;
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
           $scope.showUInfo = true;
           userService.showInfoProfile(item._id).then(function(data) {
               console.log(data);
               $scope.choosenUser = data;
               $scope.choosenUser.fullName = data.firstName + ' ' + data.lastName;
               $scope.choosenUser.role = data.role;
               $scope.choosenUser.status = data.status;
               $scope.choosenUser.mail = data.email;
               $scope.tel = data.number;
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