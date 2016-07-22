(function(){
    angular.module('admin').controller('assignTchController', ['$scope', 'userService', function($scope, userService) {
        $scope.teachers = [];
        userService.getTeachers().then(function(data) {
            data.forEach(function(item, i){
                $scope.teachers[i] = item;
                //console.log($scope.teachers[i]);

                $scope.teachers[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });

        $scope.students = [];
        userService.getUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
                $scope.students[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });

        $scope.chooseTeacher = function(item) {
            $scope.tchName = item.fullName;
            $scope.tchMail = item.email;
        };

        $scope.chooseUser = function(item) {
            $scope.stdName = item.fullName;
            $scope.stdMail = item.email;
        }


    }]);
})();