(function () {
    'use strict';

    angular.module('infrastructure')
        .factory('authContext', [
            function() {
                var context = this;
                
                var user = {
                    id: "",
                    username: "",
                    role: "",
                    email: ""
                };
                
                context.getRole = getRole;
                context.setUserData = setUserData;

                return context;


                function getRole() {
                    return user.role;
                }
                
                function setUserData(data) {
                    user.id = data.user.id;
                    user.username = data.user.name;
                    user.role = data.user.role;
                    user.email = data.user.email;
                    localStorage.setItem('jwtToken', data.token);
                    localStorage.setItem('jwtRefreshToken', data.refreshToken);
                }
            }]);
})();