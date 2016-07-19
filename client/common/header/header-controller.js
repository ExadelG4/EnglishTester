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

                $scope.logout = function () {
                    authService.logout();
                };

                $scope.admin =  [
                    {
                        name: 'HOME',
                        link: 'home',
                        tabs: []
                    },
                    {
                        name: 'ADMIN',
                        tabs: [{
                            nameT: 'Assign student',
                            link: 'assignStd'
                        }, {
                            nameT: 'Assign teacher',
                            link: 'assignTch'
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

            //    $scope.user = [
            //        {
            //            name: 'HOME',
            //            link: 'homeUser'
            //        },
            //        {
            //            name: 'Request test',
            //            link: 'requestTest'
            //        }
            //
            //    ];
            //
            //    $scope.guest = [
            //        {
            //            name: 'HOME',
            //            link: 'homeGuest'
            //        }
            //
            //    ];
            //
            //    $scope.teacher = [
            //        {
            //            name: 'HOME',
            //            link: 'homeTeacher'
            //        }
            //
            //    ];
            //
                switch($scope.role) {
                    case 'admin':
                        $scope.headerMenu = $scope.admin;
                        break;
                    case 'user':
                        $scope.headerMenu = $scope.user;
                        break;
                    case 'guest':
                        $scope.headerMenu = $scope.guest;
                        break;
                    case 'teacher':
                        $scope.headerMenu = $scope.teacher;
                        break;
                }
            }]);
})();