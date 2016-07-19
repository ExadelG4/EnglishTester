(function () {
    'use strict';

    angular.module('infrastructure')
        .factory('context', [
            function() {
                var user = {
                    id: "",
                    username: "",
                    role: "",
                    email: ""
                };

                return {
                    init: function (userData) {
                        user.id = userData.id;
                        user.username = userData.name;
                        user.role = userData.role;
                        user.email = userData.email;
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
                    }
                };
            }]);
})();