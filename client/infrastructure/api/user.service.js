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
                                    return true;
                                },
                                function () {
                                    console.log('Wrong credentials!');
                                    return false;
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
                    },

                    newUser: function (firstName_, secondName_, email_, number_) {
                        return httpService.post('http://localhost:3000/register', {password: 11111, email: email_,
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
                        return httpService.post('http://localhost:3000/assignTest', list);
                    }
                };
            }]);
})();