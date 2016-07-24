(function () {
    'use strict';

    angular.module('infrastructure')
        .service('userService', ['httpService', 'context',  'authService',
            function(httpService, context, authService) {
                var host = location.origin;

                return {
                    login: function (login, password) {
                        return httpService.post(host + '/login', {email: login, password: password})
                            .then(
                                function(result) {
                                    localStorage.setItem('context', JSON.stringify(result.data));
                                    authService.init();
                                    return true;
                                },
                                function () {
                                    console.log('Wrong credentials!');
                                    return false;
                                }
                            );
                    },
                    getUsers: function () {
                        return httpService.get(host + '/getUsers')
                            .then(
                                function (result) {
                                    return result.data;
                                }
                            )
                    },

                    getTeachers: function () {
                        return httpService.get(host + '/getTeachers')
                            .then(
                                function (result) {
                                    return result.data;
                                }
                            )
                    },

                    getAll: function () {
                        return httpService.get(host + '/getAll')
                            .then(
                                function (result) {
                                    return result.data;
                                }
                            )
                    },

                    newUser: function (firstName_, secondName_, email_, number_) {
                        return httpService.post(host + '/register', {password: 11111, email: email_,
                        firstName: firstName_, secondName: secondName_, phone: number_})
                            .then(function(result){
                                console.log('new user created');
                                return true;
                            },
                            function () {
                                console.log('create new user failed');
                                return false;
                             }
                        );
                    },

                    assignStudents: function(list) {
                        return httpService.post(host + '/assignStudents', {students: list});
                    },

                    assignTeachers: function(tch, user) {
                        return httpService.post(host + '/assignTeachers', {student: user, teacher: tch});
                    }

                };
            }]);
})();