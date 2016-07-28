(function () {
    'use strict';
    
    angular.module('home')
        .controller('userHomeController', ['$scope', '$state', 'userService', 'context', 'notification', function($scope, $state, userService, context, notification) {
            $scope.disStart;
            $scope.disReq;
            $scope.status;
            $scope.firstName = context.getFirstName();
            $scope.lastName = context.getLastName();

            $scope.updateButtons = function () {
                $scope.disStart = true;
                $scope.disReq = true;
                if ($scope.status === 'open') {
                    $scope.disStart = false;
                    $scope.disReq = true;
                }
                else if($scope.status === 'free') {
                    $scope.disStart = true;
                    $scope.disReq = false;
                }
                else if($scope.status === 'req' || $scope.status === 'stack') {
                    $scope.disStart = true;
                    $scope.disReq = true;
                }
            }

            $scope.update = function() { 
                    userService.getStatus().then(function (data) {
                    $scope.status = data;
                    $scope.updateButtons();
                });
            }
            $scope.onSendRequest = function() {
                userService.sendTestRequest().then( function() {
                    notification.success("You have successfully send request for test");
                    $scope.update();
                })
            };

            $scope.update();
            /*$scope.onStartTest = function() {
                userService.getTest();
                var 
            }*/
        }]
    );
})();