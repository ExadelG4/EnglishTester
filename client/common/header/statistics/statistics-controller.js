'use strict'

angular.module("statistics", []).controller("statisticsController", ['$scope', '$state', function($scope, $state) {
    $state.go('statistics');
 }]);
