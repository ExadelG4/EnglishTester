(function () {
    'use strict';

    angular.module('statistic', []).controller('statisticController', ['$scope', '$state', '$rootScope', 'userService', 'getStatisticsFromNews', 'getObjToChart',
        function($scope, $state, $rootScope, userService, getStatisticsFromNews, getObjToChart) {

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
               getObjToChart.setPersonObj(data);
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

    angular.module('myApp').controller('chartCtrl', ['$scope', '$q', 'userService', 'getObjToChart', function($scope, $q, userService, getObjToChart) {
        // var t = 50; var s = 80; var m = 60; var g = 45; var b = 25;

        $scope.myData = [];

        function getChartData () {
            $scope.loaded = false;
            var arr = [];
            debugger;
            console.log(getObjToChart.getPersonObj());
            getObjToChart.getPersonPromise().then(function(data) {
                $scope.myData = data.results.map(function (item, i) {
                    return item.result.totalMark;
                });
            }).finally(function(){
                $scope.loaded = true;
            });

        }

        $scope.$watch(function() {
            return getObjToChart.getPersonObj();
        }, function (newValue, oldValue) {
            if (!angular.equals(newValue,oldValue)) {
                getChartData();
            }
        });


        getChartData();
    }]);

})();