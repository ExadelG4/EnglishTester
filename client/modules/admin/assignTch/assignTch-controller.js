(function(){
    angular.module('admin').controller('assignTchController', ['$scope', 'userService', function($scope, userService) {

        $scope.teachers = [];
        $scope.students = [];
        $scope.currentUser = null;
        $scope.currentTeacher = null;

        userService.getTeachers().then(function(data) {
            data.forEach(function(item, i){
                $scope.teachers[i] = item;
                $scope.teachers[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });

        userService.getUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
                $scope.students[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });

        $scope.chooseTeacher = function(item) {
            $scope.tchName = item.fullName;
            $scope.tchMail = item.email;
            $scope.currentTeacher = item;

        };

        $scope.chooseUser = function(item) {
            $scope.stdName = item.fullName;
            $scope.stdMail = item.email;
            $scope.currentUser = item;
        }

        $scope.submitTchStd = function() {
            userService.assignTeacher($scope.currentUser._id, $scope.currentTeacher._id);

            $scope.stdName = '';
            $scope.stdMail = '';
            $scope.tchName = '';
            $scope.tchMail = '';

        }


    }]);
})();