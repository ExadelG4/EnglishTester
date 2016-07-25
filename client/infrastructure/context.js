(function () {
    'use strict';

    angular.module('infrastructure')
        .factory('context', [
            function() {
                var user = {
                    id: "",
                    firstName: "",
                    lastName: "",
                    role: "",
                    email: "",
                    number: ""
                };

                return {
                    init: function (userData) {
                        console.log(userData);
                        user.id = userData.id;
                        user.firstName = userData.firstName;
                        user.lastName = userData.lastName;
                        user.role = userData.role;
                        user.email = userData.email;
                        user.number = userData.number;
                    },
                    getRole: function () {
                        return user.role;
                    },
                    isAdmin: function () {
                        return user.role === 'admin';
                    },
                    isUser: function () {
                        return user.role === 'user';
                    },
                    isTeacher: function () {
                        return user.role === 'teacher';
                    },
                    isGuest: function () {
                        return user.role === 'guest';
                    },
                    getFirstName: function() {
                        return user.firstName;
                    },
                    getLastName: function() {
                        return user.lastName;
                    },
                    getEmail: function() {
                        return user.email;
                    },
                    getNumber: function() {
                        return user.number;
                    }
                };
            }]);
})();