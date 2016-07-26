(function () {
    'use strict';
    
    angular.module('home')
        .controller('userHomeController', ['$scope', '$state', 'userService', 'context', function($scope, $state, userService, context) {
            //sif(context.status === 'tree')
            var status = userService.getStatus();
            $scope.recordedInput = null;

            $scope.onSendRequest = function() {
                userService.sendTestRequest().then( function(data) {
                    context.success("You have successfully send request for test");
                })
            };
            /*$scope.onStartTest = function() {
                userService.getTest();
                var 
            }*/
        }]
    );
})();