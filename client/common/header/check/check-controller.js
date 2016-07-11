'use strict'

angular.module('check', []).controller('checkController', ['$scope', '$state', function($scope, $state) {
    $state.go('check');
}]);