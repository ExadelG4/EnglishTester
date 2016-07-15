(function () {
    'use strict';

    angular.module('infrastructure', [])
        .factory('authService', ['$http', 'context', '$location',
            function($http, context, $location) {
                function refresh(localContext) {
                    return $http.get('http://localhost:3000/refresh',
                        {headers: {'Authorization': localContext.token, 'Refresh': localContext.refreshToken}})
                        .then(function (result) {
                            localContext.token = result.data.token;
                            localContext.refreshToken = result.data.refreshToken;
                            localContext.expiredTime = result.data.expiredTime;
                        });
                }

                function checkRefresh() {
                    var intervalID = setInterval(function () {
                        var localContext = JSON.parse(localStorage.getItem('context'));
                        if (localContext) {
                            var expTime = localContext.expiredTime;
                            var now = new Date().getTime();
                            if (expTime > now) {
                                if (expTime - now < 120 * 1000) {
                                    refresh(localContext);
                                }
                            } else {
                                clearInterval(intervalID);
                                $location.path('/login');
                            }
                        } else {
                            clearInterval(intervalID);
                            $location.path('/login');
                        }
                    }, 5 * 1000);
                }

                return {
                    isAuthenticate: false,
                    init: function () {
                        var localContext = JSON.parse(localStorage.getItem('context'));
                        if (localContext) {
                            if(localContext.expiredTime < new Date().getTime()) {
                                this.isAuthenticated = false;
                            } else {
                                checkRefresh();
                                context.init(localContext.user);
                                this.isAuthenticated = true;
                            }
                        } else {
                            this.isAuthenticated = false;
                        }
                    },
                    logout: function () {
                        localStorage.removeItem('context');
                        $location.path('/login');
                    }
                };
    }]);
})();