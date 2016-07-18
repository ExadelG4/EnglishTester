(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state', 'authService',
            function($scope, $state, authService) {
                $scope.isActiveTab = function (name) {
                    //return $(this).style("text-decoration: underline");
                };

                $scope.logout = function () {
                    authService.logout();
                };

                jQuery('ul > li').hover(function() {
                    jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
                }, function() {
                    jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
                })
            }]);
})();