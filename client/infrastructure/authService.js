(function () {
    'use strict';

    angular.module('infrastructure', [])
        .factory('authService', ['$http', 'context', '$state',
            function($http, context, $state) {

                return {
                    init: function () {
                        var localContext = JSON.parse(localStorage.getItem('context'));
                        if (localContext) {
                            if(localContext.expiredTime < new Date()) {
                                $state.go('login');
                            } else {
                                //todo: run checkRefresh
                                context.init(localContext.user);
                                //todo: redirect to necessary page
                            }
                        } else {
                            $state.go('login');
                        }
                    },
                    refresh: function () {
                        var localContext = JSON.parse(localStorage.getItem('context'));
                        if (!localContext) {
                            $state.go('login');
                            return;
                        }
                        
                    }
                };
    }]);
})();