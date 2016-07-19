(function () {
    'use strict';

    angular.module('home')
        .controller('homeTeacherController', ['$scope',
            function($scope) {
                $scope.msg = "Teacher";
                $scope.testList = [
                    {type: 'one'},
                    {type: 'two'}
                ];
            }]);
})();
