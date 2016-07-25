(function(){
    angular.module('admin').controller('assignStdController', ['$scope', 'userService', function($scope, userService) {
        $scope.students = [];
        $scope.showList = [];
        var chooseUserList = [];
        var currentStudent;

        userService.getUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
                $scope.students[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });

        var stdConstructor = function(stdId, stdData, stdData2){
            this.userId =  stdId;
            this.dataSt =  stdData;
            this.dataEn =  stdData2;

        };

        $scope.hasChanged = function(item){
            currentStudent = item;
            $scope.stdName = item.fullName;
            $scope.stdMail = item.email;
        };

        $scope.reset = function(){
            $scope.showList = [];
        };

        $scope.addStudent = function() {
            var newStudent = new stdConstructor(currentStudent._id, $scope.dateStart, $scope.dateEnd);
            chooseUserList.push(newStudent);
            $scope.showList.push(currentStudent.fullName);

            $scope.stdName = '';
            $scope.stdMail = '';
            $scope.dateStart = '';
            $scope.dateEnd = '';
        };

        $scope.submitStudentsList = function() {
            userService.assignStudents(chooseUserList);
            $scope.showList = [];
            chooseUserList = [];
        };

        //(function () {
        //      $('#datetimepicker2').datetimepicker();
        //      $('#datetimepicker3').datetimepicker();
        //})();




        $scope.myCal = function(dt) {
            console.log(dt);
            var k = new Date(dt);
            console.log(dt);
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
            $scope.dt = new Date(year, month, day);
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
    }]);
})();

