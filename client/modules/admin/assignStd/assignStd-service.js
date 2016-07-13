(function() {
    angular.module('admin').service('assignStdService', ['$http', function($http) {
        var service = this;

        service.getListStudents = function() {
            return $http.get('http://localhost:3000/getUsers').then(function(result) {
                return result.data;
            });
        }

        return service;


    }])
})();