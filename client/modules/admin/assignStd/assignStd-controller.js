(function(){
    'use strict';
    angular.module('admin').controller('assignStdController', ['$scope', 'userService', '$location', 'notification', function($scope, userService, $location, notification) {
        $scope.freeStudents = [];
        $scope.copyFreeStudents = [];
        $scope.showList = [];
        $scope.disabled = true;
        var chooseUserList = [];
        var currentStudent;
        var currentList;

        checkURL();

        function checkURL(){
            if($location.absUrl() == 'http://localhost:3000/home') {
                $scope.currentRequest = userService.getUsersRequests();
                findOutURL($scope.currentRequest);
            } else {
                $scope.currentRequest = userService.getFreeUsers();
                findOutURL($scope.currentRequest);
            }
        }

        function findOutURL (req) {
            req.then(function(data) {
                $scope.freeStudents = [];
                $scope.copyFreeStudents = [];
                data.forEach(function(item, i) {
                    $scope.freeStudents[i] = item;
                    $scope.copyFreeStudents[i] = item;
                    $scope.freeStudents[i].fullName = item.firstName + ' ' + item.lastName;
                    $scope.copyFreeStudents[i].fullName = item.firstName + ' ' + item.lastName;
                });
            });
        }

        function clear() {
            $scope.disabled = false;
            $scope.freeStdName = '';
            $scope.freeStdMail = '';
            $scope.freeStdTel = '';
            $scope.mytime3 = null;
            $scope.mytime4 = null;
            $scope.selectedItem4 = '';
            $scope.dt3 = null;
            $scope.dt4 = null;
        }

        var stdConstructor = function(stdId, stdData, stdData2){
            this.userId =  stdId;
            this.dateStart =  stdData;
            this.dateEnd =  stdData2;

        };

        $scope.hasChanged = function(item){
            currentStudent = item;
            console.log(item);
            $scope.freeStdName = item.fullName;
            $scope.freeStdMail = item.email;
            $scope.freeStdTel = item.number;
        };

        $scope.reset = function(){
            $scope.showList = [];
            chooseUserList = [];
            $scope.disabled = true;
            checkURL();

        };

        $scope.addStudent = function() {
            var userId = currentStudent._id;
            var newStudent = new stdConstructor(userId, $scope.dt3.getTime() + $scope.mytime3.getHours()+$scope.mytime3.getMinutes(), $scope.dt4.getTime() + $scope.mytime4.getHours()+$scope.mytime4.getMinutes());

            chooseUserList.push(newStudent);
            $scope.showList.push(currentStudent.fullName);

            var res;
            $scope.freeStudents.map(( obj, i ) =>
                (obj.email == currentStudent.email) ? (res = i) : (false)
            );
            $scope.freeStudents.splice(res, 1);
            clear();
        };

        $scope.submitStudentsList = function() {
            userService.assignStudents(chooseUserList).then(function() {
                checkURL();
            });
            notification.success("You have successfully assigned test for users");
            console.log($scope.freeStudents);
            $scope.showList = [];
            chooseUserList = [];
            $scope.disabled = true;
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



    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
        $scope.minDate2 = $scope.minDate ? null : new Date($scope.minDate);
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt3 = new Date(year, month, day);
        $scope.dt4 = new Date(year, month, day);
    };

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.hstep = 1;
    $scope.mstep = 1;

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime3 = d;
        $scope.mytime4 = d;
    };



}]);})();

