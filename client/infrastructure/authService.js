(function () {
    'use strict';

    angular.module('infrastructure', [])
        .factory('authService', ['$http', 'authContext',
            function($http, authContext) {
                var role = '';

                var authService = {
                    login: login,
                    getRole: getRole,
                    getUser: getUser
                };

                return authService;

                function login(login, password) {
                    return $http.post('http://localhost:3000/login', {email: login, password: password})
                        .then(
                            function(result) {
                                role = result.data.user.role;
                                authContext.setUserData(result.data);
                            }
                        );
                }

                function getRole() {
                    return role;
                }

                function getUser() {
                    
                }
    }]);
})();