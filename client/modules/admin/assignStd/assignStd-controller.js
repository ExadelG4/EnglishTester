(function(){
    'use strict';
    angular.module('admin').controller('assignStdController', ['$scope', 'userService', function($scope, userService) {
        $scope.freeStudents = [];
        $scope.showList = [];
        var chooseUserList = [];
        var currentStudent;

        userService.getFreeUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.freeStudents[i] = item;
                $scope.freeStudents[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });

        var stdConstructor = function(stdId, stdData, stdData2){
            this.userId =  stdId;
            this.dateStart =  stdData;
            this.dateEnd =  stdData2;

        };

        $scope.hasChanged = function(item){
            currentStudent = item;
            $scope.freeStdName = item.fullName;
            $scope.freeStdMail = item.email;
            $scope.freeStdTel = item.number;
        };

        $scope.reset = function(){
            $scope.showList = [];
        };

        $scope.addStudent = function(dt3, dt4) {
            var userId = currentStudent._id;
            var newStudent = new stdConstructor(userId, dt3.getTime() + $scope.mytime3.getHours()+$scope.mytime3.getMinutes(), dt4.getTime() + $scope.mytime4.getHours()+$scope.mytime4.getMinutes());
            chooseUserList.push(newStudent);
            $scope.showList.push(currentStudent.fullName);

            $scope.freeStdName = '';
            $scope.freeStdMail = '';
            $scope.freeStdTel = '';
            $scope.mytime3 = null;
            $scope.mytime4 = null;
            $scope.selectedItem4 = '';
            //$scope.dt = null;
            //$scope.dt2 = null;
        };

        $scope.submitStudentsList = function() {
            userService.assignStudents(chooseUserList);
            $scope.showList = [];
            chooseUserList = [];
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
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
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


    $scope.mytime3 = new Date();
    $scope.mytime4 = new Date();

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

