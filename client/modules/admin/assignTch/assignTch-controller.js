(function(){
    angular.module('admin').controller('assignTchController', ['$scope', 'userService', function($scope, userService) {
        $scope.teachers = [];
        userService.getTeachers().then(function(data) {
            data.forEach(function(item, i){
                $scope.teachers[i] = item;
                //console.log($scope.teachers[i]);
            });
        });

        $scope.students = [];
        userService.getUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
            });
        });

        $scope.chooseTeacher = function(item) {
            $scope.tchName = item.firstName + ' ' + item.lastName;
            $scope.tchMail = item.email;
        };

        $scope.chooseUser = function(item) {
            $scope.stdName = item.firstName + ' ' + item.lastName;
            $scope.stdMail = item.email;
        }

    }]);
})();