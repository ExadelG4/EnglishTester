(function() {
    'use strict';
    angular.module('admin')
        .controller('newUserController', ['$scope', 'userService',
            function ($scope, userService) {

                $scope.newUser = function () {
                    var dateStart = $scope.dt.getTime() + $scope.mytime.getTime();
                    var dateEnd = $scope.dt2.getTime() + $scope.mytime2.getTime();
                    userService.newUser($scope.firstMd, $scope.secondMd, $scope.emailMd, $scope.phnumberMd, dateStart, dateEnd);
                    $scope.dt = null;
                    $scope.dt2 = null;
                    $scope.mytime = null;
                    $scope.mytime2 = null;
                };

                $scope.inlineOptions = {
                    customClass: getDayClass,
                    minDate: new Date(),
                    showWeeks: true
                };

                $scope.dateOptions = {
                    formatYear: 'yy',
                    maxDate: new Date(2020, 5, 22),
                    minDate: new Date(),
                    startingDay: 1
                };


                $scope.toggleMin = function () {
                    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
                };

                $scope.toggleMin();

                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.popup1 = {
                    opened: false
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.setDate = function (year, month, day) {
                    $scope.dt = new Date(year, month, day);
                    $scope.dt2 = new Date(year, month, day);
                };

                function getDayClass(data) {
                    var date = data.date,
                        mode = data.mode;
                    if (mode === 'day') {
                        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                        for (var i = 0; i < $scope.events.length; i++) {
                            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                            if (dayToCheck === currentDay) {
                                return $scope.events[i].status;
                            }
                        }
                    }

                    return '';
                }


                $scope.mytime = new Date();
                $scope.mytime2 = new Date();

                $scope.hstep = 1;
                $scope.mstep = 1;

                $scope.ismeridian = true;
                $scope.toggleMode = function () {
                    $scope.ismeridian = !$scope.ismeridian;
                };

                $scope.update = function () {
                    var d = new Date();
                    d.setHours(14);
                    d.setMinutes(0);
                    $scope.mytime = d;
                    $scope.mytime2 = d;
                };

            }]);
})();