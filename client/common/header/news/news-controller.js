'use strict'

angular.module('news', []).controller('newsController', ['$scope', '$state', function($scope, $state) {
    $state.go('news');
}])