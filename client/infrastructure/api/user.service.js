(function () {
    'use strict';

    angular.module('infrastructure')
        .service('userService', ['httpService', 'context',  'authService',
            function(httpService, context, authService) {

                return {
                    login: function (login, password) {
                        return httpService.post('http://localhost:3000/login', {email: login, password: password})
                            .then(
                                function(result) {
                                    localStorage.setItem('context', JSON.stringify(result.data));
                                    authService.init();
                                }
                            );
                    },
                    getUsers: function () {
                        return httpService.get('http://localhost:3000/getUsers')
                            .then(
                                function (result) {
                                    return result.data;
                                }
                            )
                    },

                    getTeachers: function () {
                        return httpService.get('http://localhost:3000/getTeachers')
                            .then(
                                function (result) {
                                    return result.data;
                                }
                            )
                    },

                    getAll: function () {
                        return httpService.get('http://localhost:3000/getAll')
                            .then(
                                function (result) {
                                    return result.data;
                                }
                            )
                    }
                };
            }]);
})();