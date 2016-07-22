(function () {
    'use strict';
    
    angular.module('home')
        .controller('userHomeController', ['$scope', '$state', function($scope) {
            $scope.userInformation = {
                isSentReq: false
            };

            $scope.onSendRequest = function() {
                $scope.userInformation.isSentReq = true;
            };
        }]
    );
})();