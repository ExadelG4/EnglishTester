(function () {
    'use strict';

    angular.module('home')
        .controller('adminHomeController', ['$scope', 'EventWrapper', 'notification', 'userService',
            function ($scope, EventWrapper, notification, userService) {

            $scope.tabs = [
                {
                    "heading": "Finished tests",
                    "template": "modules/home/admin/resultNews.html"
                },
                {
                    "heading": "Tests for assign of teachers",
                    "template": "modules/admin/assignTch/assignTch.html"
                },
                {
                    "heading": "Tests for assign of students",
                    "template": "modules/admin/assignStd/assignStd.html"
                }
            ];

                // $scope.showInfo = function(item) {
                //     $scope.showUInfo = true;
                //     console.log(item._id);
                //     userService.showInfoProfile(item._id).then(function(data) {
                //         $scope.choosenUser = data;
                //         $scope.choosenUser.fullName = data.firstName + ' ' + data.lastName;
                //         $scope.choosenUser.role = data.role;
                //         $scope.choosenUser.status = data.status;
                //         $scope.choosenUser.mail = data.email;
                //         $scope.tel = data.number;
                //     })
                // };
                

                //$scope.newsUser = [];
                //$scope.newsTeacher = [];
                //
                //$scope.newsUser.push('')

                // $scope.msg = 'Some text';

                // $scope.popToastr = function (type) {
                //     switch (type) {
                //         case 'Warning':
                //             notification.warning($scope.msg);
                //             break;
                //         case 'Error':
                //             notification.error($scope.msg);
                //             break;
                //         case 'Success':
                //             notification.success($scope.msg);
                //             break;
                //     }
                // };

                // var thing = new EventWrapper(123);
                //
                // thing.on($scope, 'event', function (msg) {
                //     console.log('It`s work: ' + msg);
                // });
                //
                // var i = 0;
                // setInterval(function () {
                //     thing.emit('event', i++);
                // }, 10000);
                //}]);

            }
        ]);
})();
