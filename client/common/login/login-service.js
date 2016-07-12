'use strict';

angular.module('login', []).service('loginService', ['$http', function($http) {
    this.login = function(name, surname) {
         return $http.get('http://localhost:3000/login')
            .then(function(result) {
                    console.log(result.data);
                },
                function() {

                });
    }
}]);
