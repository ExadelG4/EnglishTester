(function () {
    'use strict';

    angular.module('home', []);

    angular.module('home')
        .controller('homeController', ['$scope', '$state', 'authContext', 'authService',
            function($scope, $state, authContext, authService) {
                var ctrl = this;
                
                ctrl.role = authContext.getRole();
                $scope.role = authService.getRole();
            }]);
})();
