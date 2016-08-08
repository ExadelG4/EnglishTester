(function () {
    'use strict';

    angular.module('statistic', []).controller('statisticController', ['$scope', '$state', '$rootScope', 'userService', 'getStatisticsFromNews', function($scope, $state, $rootScope, userService, getStatisticsFromNews) {

        $scope.searchList = [];
        $scope.show = false;
        $scope.showUInfo = false;

        $scope.objFlags = {
            name: "",
            res: false,
            req: false,
            finish: false
        };

        function showPersonList(obj) {
            userService.searchUser(obj).then(function(data) {
                $scope.show = true;
                data.forEach(function(item, i) {
                    $scope.searchList[i] = item;
                    $scope.searchList[i].fullName = item.firstName + ' ' + item.lastName;
                });
            }).then (function() {
                getStatisticsFromNews.setPersonStatistic();
                $scope.objFlags = {
                    name: "",
                    res: false,
                    req: false,
                    finish: false
                };
            })
        }

        if(getStatisticsFromNews.getPersonStatistic() != undefined ) {
            alert(getStatisticsFromNews.getPersonStatistic());
            var resFlag = getStatisticsFromNews.getPersonStatistic();
            switch(resFlag) {
                case 'res':
                    $scope.objFlags.res = true;
                    break;
                case 'req':
                    $scope.objFlags.req = true;
                    break;
                case 'finish':
                    $scope.objFlags.finish = true;
                    break;
            }
            showPersonList($scope.objFlags);
        }

        $scope.searchUser = function() {
            $scope.searchList = [];
            $scope.showUInfo = false;
            $scope.objFlags.name = $scope.searching;
            showPersonList($scope.objFlags);
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
               $scope.choosenUser.tel = data.number;
               $scope.choosenUser.assignTest = data.assignTest;
               $scope.choosenUser.totalTests = data.totalTests;
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