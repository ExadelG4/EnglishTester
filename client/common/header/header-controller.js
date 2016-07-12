(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state',
            function($scope, $state) {
                this.isActiveTab = function (name) {
                    return $state.current.name === name;
                }
            }]);
})();