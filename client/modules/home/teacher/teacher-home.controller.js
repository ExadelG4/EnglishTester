(function () {
    'use strict';

    angular.module('home')
        .controller('teacherHomeController', ['$scope', 'userService',
            function($scope, userService) {
                $scope.list = []

                userService.getTestsList()
                    .then ( function(data) {
                        $scope.list = data;
                    })
                
                $scope.testList = [
                    {
                        level: 'Intermediate',
                        date: new Date()
                    },
                    {
                        level: 'Upper-Intermediate',
                        date: new Date()
                    }
                ];
            }]);
})();
