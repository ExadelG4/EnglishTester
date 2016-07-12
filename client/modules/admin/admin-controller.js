'use strict'

angular.module('admin', []).controller('adminController', ['$scope', '$state', function($scope, $state) {
    $state.go('admin');
}])