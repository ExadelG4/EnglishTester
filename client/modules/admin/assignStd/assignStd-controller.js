(function(){
    angular.module('admin').controller('assignStdController', ['$scope', 'userService', function($scope, userService) {
        $scope.students = [];
        userService.getUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
                $scope.students[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });

        var chooseUserList = [];
        $scope.showList = [];
        var currentStudent;

        var stdConstructor = function(stdId, stdData, stdData2){
            this.userId =  stdId;
            this.dataStart =  stdData;
            this.dataEnd =  stdData2;

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
            var userId = currentStudent._id;
            var newStudent = new stdConstructor(userId, $scope.dateStart, $scope.dateEnd);
            chooseUserList.push(newStudent);
            $scope.showList.push(currentStudent.fullName);

            $scope.stdName = '';
            $scope.stdMail = '';
            $scope.dateStart = '';
            $scope.dateEnd = '';
        };

        $scope.submitStudentsList = function() {
            console.log(chooseUserList);
            $scope.showList = [];
            userService.assignStudents(chooseUserList).then(function(result){
                if (result){
                    alert('ok');
                } else{
                    alert('fail');
                }
            });
        };


        (function () {
              $('#datetimepicker1').datetimepicker();
              $('#datetimepicker2').datetimepicker();
        })();


    }]);
})();

