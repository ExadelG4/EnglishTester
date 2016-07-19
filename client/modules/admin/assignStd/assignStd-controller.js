(function(){
    angular.module('admin').controller('assignStdController', ['$scope', 'userService', function($scope, userService) {
        $scope.students = [];
        userService.getUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
                //$scope.students[i].fullName = item.firstName + ' ' + item.lastName;
            });
        });
        $scope.chooseUserList = [];

        $scope.hasChanged = function(item){
            var fullName = item.firstName + ' ' + item.lastName;
            $scope.chooseUserList.push(fullName);
            $scope.stdName = item.firstName + ' ' + item.lastName;
            $scope.stdMail = item.email;
        };

        $scope.reset = function(){
            $scope.chooseUserList = [];
        };
    }]);
})();

