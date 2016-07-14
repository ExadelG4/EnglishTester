(function () {
    'use strict';

    angular.module('infrastructure')
        .factory('authContext', [
            function() {
                var user = {
                    id: "",
                    username: "",
                    role: "",
                    email: ""
                };

                return {
                    init: function (data) {
                        user.id = data.id;
                        user.username = data.name;
                        user.role = data.role;
                        user.email = data.email;
                    },
                    getRole: function () {
                        return user.role;
                    }
                };
            }]);
})();