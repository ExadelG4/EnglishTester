(function () {
    'use strict';

    angular.module('home')
        .controller('teacherHomeController', ['$scope', 'userService', '$rootScope',
            function($scope, userService, $rootScope) {

                $scope.list = [];
                $scope.date = [];
                $rootScope.checking = false;

                userService.getTestsList()
                    .then ( function(data) {
                        $scope.list = data;
                        for (var i = 0; i < data.length; ++i) {
                            $scope.date[i] = new Date($scope.list[i].date).toDateString();
                        }
                    })
                $scope.startCheck = function() {
                    $rootScope.checking = true;
                }             

            }]);
})();
