(function () {
    'use strict';
    
    angular.module('home')
        .controller('userHomeController', ['$scope', '$state', 'userService', 'context', 'notification', function($scope, $state, userService, context, notification) {
            //sif(context.status === 'tree')
            $scope.status = userService.getStatus();
            $scope.recordedInput = null;

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