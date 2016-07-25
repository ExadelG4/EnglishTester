(function () {
    'use strict';

    angular.module('home')
        .controller('teacherHomeController', ['$scope',
            function($scope) {
                $scope.isShowList = true;
                
                /*$scope.changeIsShowList = function () {
                    $scope.isShowList = !$scope.isShowList;
                };*/
                
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
