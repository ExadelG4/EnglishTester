(function () {
    'use strict';

    angular.module('infrastructure', [])
        .factory('authService', ['$http', 'context', '$state',
            function($http, context, $state) {
                function refresh(localContext) {
                    return $http.get('http://localhost:3000/refresh',
                        {headers: {'Authorization': localContext.token, 'Refresh': localContext.refreshToken}})
                        .then(function (result) {
                            localContext.token = result.data.token;
                            localContext.refreshToken = result.data.refreshToken;
                            localContext.expiredTime = result.data.expiredTime;
                            localStorage.setItem('context', JSON.stringify(localContext));
                        });
                }

                function checkRefresh(self) {
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
                                self.isAuthenticated = false;
                                context.clear();
                                clearInterval(intervalID);
                                $state.go('login');
                            }
                        } else {
                            clearInterval(intervalID);
                            $state.go('login');
                        }
                    }, 5 * 1000);
                }

                return {
                    isAuthenticated: false,
                    init: function () {
                        var localContext = JSON.parse(localStorage.getItem('context'));
                        if (localContext) {
                            if(localContext.expiredTime < new Date().getTime()) {
                                this.isAuthenticated = false;
                            } else {
                                checkRefresh(this);
                                context.init(localContext.user);
                                this.isAuthenticated = true;
                            }
                        } else {
                            this.isAuthenticated = false;
                        }
                    },
                    logout: function () {
                        localStorage.removeItem('context');
                        this.isAuthenticated = false;
                        context.clear();
                        $state.go('login');
                    }
                };
    }]);
})();