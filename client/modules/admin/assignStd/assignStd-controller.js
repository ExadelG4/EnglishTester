(function(){
    angular.module('admin').controller('assignStdController', ['$scope', 'assignStdService', function($scope, assignStdService) {
        this.students = function() {
            return assignStdService.getListStudents();
    }}]);
})();