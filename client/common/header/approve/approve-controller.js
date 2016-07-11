'use strict'

angular.module('approve', []).controller('approveController', ['$scope', '$state', function($scope, $state) {
    $state.go('approve');
}]);
