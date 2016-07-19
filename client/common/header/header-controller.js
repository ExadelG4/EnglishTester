(function () {
    'use strict';
    angular.module('myApp')
        .controller('headerController', ['$scope', '$state', 'authService', 'context',
            function($scope, $state, authService, context) {

                $scope.role = null;
                (function(){
                    $scope.role = JSON.parse(localStorage.getItem('context')).user.role;

                })();
                console.log($scope.role);

                $scope.isActiveTab = function (name) {
                    //return $(this).style("text-decoration: underline");
                };

                $scope.logout = function () {
                    authService.logout();
                };

                $scope.changeLink = function (){
                    state.go('/assignStd');
                };

                $scope.admin =  [
                    {
                        name: 'HOME',
                        link: 'homeAdmin',
                        tabs: []
                    },
                    {
                        name: 'ADMIN',
                        tabs: [{
                            nameT: 'Assign student',
                            link: 'assignStd'
                        }, {
                            nameT: 'Assign student',
                            link: 'assignStd'
                        }, {
                            nameT: 'New user',
                            link: 'newUser'
                        }]
                    },
                    {
                        name: 'TESTS',
                        tabs: [{
                                nameT: 'Add question',
                                link: 'addQuestion'
                            },
                            {
                                nameT: 'Edit question',
                                link: 'editQuestion'
                            }
                        ]
                    }

                ];

                switch($scope.role) {
                    case 'admin':
                        $scope.headerMenu = $scope.admin;
                        break;
                    case 'user':
                        $scope.headerMenu = $scope.user;
                        break;
                }
            }]);
})();