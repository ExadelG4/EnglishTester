(function () {
    'use strict';

    angular.module('infrastructure', [])
        .factory('authService', ['$http', 'authContext',
            function($http, authContext) {

                return {
                    init: function () {
                        var context = localStorage.getItem('context');
                        if (context) {
                            
                            //todo: check expired
                        } else {
                            $state.go('login');
                        }
                    },
                    login: function (login, password) {
                        return $http.post('http://localhost:3000/login', {email: login, password: password})
                            .then(
                                function(result) {
                                    localStorage.setItem('context', result.data);
                                    authContext.init(result.data.user);
                                    this.init();
                                }
                            );
                    }
                };
    }]);
})();