(function () {
    'use strict';

    angular.module('infrastructure')
        .factory('httpService', ['$http',
            function($http) {
                return {
                    get: function (url) {
                        var context = localStorage.getItem('context');
                        if (!context) {
                            return $http.get(url);
                        }
                        return $http.get(url, {headers: {'Authorization': context.token}});
                    },
                    post: function (url, obj) {
                        var context = localStorage.getItem('context');
                        if (!context) {
                            return $http.post(url, obj);
                        }
                        return $http.post(url, obj, {headers: {'Authorization': context.token}});
                    },
                    put: function () {
                        console.log('PUT - is not available from httpService. Coming soon.')
                    },
                    delete: function () {
                        console.log('DELETE - is not available from httpService. Coming soon.')
                    }
                };
            }]);
})();