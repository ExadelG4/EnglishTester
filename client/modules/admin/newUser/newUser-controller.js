(function () {
    'use strict';
    angular.module('admin')
        .controller('newUserController', ['$scope', 'userService',
        function($scope, userService) {
            $scope.newUser = function(){
                // var newUsr = {};
                // newUsr.firstName = $scope.firstMd;
                // newUsr.secondName = $scope.secondMd;
                // newUsr.email = $scope.emailMd;
                // newUsr.phone = $scope.phnumberMd;
                userService.newUser($scope.firstMd, $scope.secondMd, $scope.emailMd, $scope.phnumberMd);


            }

     }])
    
})();

