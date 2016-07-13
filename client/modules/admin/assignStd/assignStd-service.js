(function() {
    angular.module('assignStdService', []).service('$http', function($http) {
        var service = this;

        function getListStudents() {
            return $http.get('http://localhost:8080/user_controller/select_all_users_login').success(function(students) {
                this.students = students;
                console.log (students);
            });
        }

        service.getListStudents = getListStudents;

        return service;


    })
})();