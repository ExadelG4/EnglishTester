(function () {
    'use strict';
    
    angular.module('home')
        .controller('userHomeController', ['$scope', '$state', 'userService', 'context', 'notification', function($scope, $state, userService, context, notification) {
            //sif(context.status === 'tree')
            $scope.status;
            userService.getStatus().then(function (data) {
                $scope.status = data;
            });
            $scope.disStart = false;
            $scope.disReq = false;
            $scope.recordedInput = null;
            if ($scope.status === 'free') {
                $scope.disStart = false;
                $scope.disReq = true;
            }
            else if($scope.status = 'open') {
                $scope.disStart = true;
                $scope.disReq = false;
            }
            $scope.onSendRequest = function() {
                userService.sendTestRequest().then( function(data) {
                    notification.success("You have successfully send request for test");
                })
            };
            /*$scope.onStartTest = function() {
                userService.getTest();
                var 
            }*/
        }]
    );
})();