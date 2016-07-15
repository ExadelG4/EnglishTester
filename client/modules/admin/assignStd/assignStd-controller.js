(function(){
    angular.module('admin').controller('assignStdController', ['$scope', 'assignStdService', function($scope, assignStdService) {
        $scope.students = [];
        assignStdService.getListStudents().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
            });
        });

        $scope.chooseUserList = [];

        $scope.hasChanged = function(item){
            $scope.chooseUserList.push(item.name);
        }
    }]);
})();

