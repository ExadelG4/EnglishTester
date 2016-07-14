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
                    }
                };
            }]);
})();