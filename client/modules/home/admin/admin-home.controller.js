(function () {
    'use strict';

    angular.module('home')
        .controller('adminHomeController', ['$scope', 'EventWrapper', 'notification',
            function ($scope, EventWrapper, notification) {

                //$scope.newsUser = [];
                //$scope.newsTeacher = [];
                //
                //$scope.newsUser.push('')

                $scope.popToastr = function (type) {
                    switch (type) {
                        case 'Warning':
                            notification.warning($scope.msg);
                            break;
                        case 'Error':
                            notification.error($scope.msg);
                            break;
                        case 'Success':
                            notification.success($scope.msg);
                            break;
                    }
                };

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
