(function () {
    'use strict';

    angular.module('home')
        .controller('adminHomeController', ['$scope', 'EventWrapper',
            function($scope, EventWrapper) {
                $scope.isShowList = true;

                $scope.changeIsShowList = function () {
                    $scope.isShowList = !$scope.isShowList;
                };

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
            }]);
})();
