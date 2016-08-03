(function () {
    'use strict';

    angular.module('home')
        .controller('teacherHomeController', ['$scope', 'userService',
            function($scope, userService) {

                $scope.list = [];
                $scope.date = [];

                userService.getTestsList()
                    .then ( function(data) {
                        $scope.list = data;
                        for (var i = 0; i < data.length; ++i) {
                            $scope.date[i] = new Date($scope.list[i].date).toDateString();
                        }
                    })
                

            }]);
})();
