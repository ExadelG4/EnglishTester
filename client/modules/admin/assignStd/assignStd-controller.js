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
        $scope.input = {
        };

        var stdConstructor = function(stdId, stdData, stdData2){
            this.id =  stdId;
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
            var newStudent = new stdConstructor(currentStudent._id, $scope.input.dateStart, $scope.input.dateEnd);
            chooseUserList.push(newStudent);
            $scope.showList.push(currentStudent.fullName);
            console.log($('.dateStart').val);

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

        $scope.input.changeDate = function() {
            console.log($scope.input.dateStart);
        };


        (function () {
              $('#datetimepicker2').datetimepicker();
              $('#datetimepicker3').datetimepicker();
        })();

        $scope.$watch('input.dateStart', function(n,o){

        })




    }]);
})();

