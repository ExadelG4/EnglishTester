(function () {
    'use strict';
    angular.module('myApp')
        .factory('navigationFactory', ['context',
        function (context) {

            var adminNav = [
                {
                    name: 'Home',
                    state: 'home'
                },
                {
                    name: 'Admin',
                    tabs: [
                        {
                            name: 'Assign a test for users',
                            state: 'assignStd'
                        },
                        {
                            name: 'New user',
                            state: 'newUser'
                        }
                    ]
                },
                {
                    name: 'Statistics',
                    state: 'statistics'
                },
                {
                    name: 'Tests',
                    tabs: [
                        {
                            name: 'Add question',
                            state: 'addQuestion'
                        },
                        {
                            name: 'Bad questions',
                            state: 'badQuestions'
                        }
                    ]
                }
            ];

            var userNav = [
                {
                    name: 'Home',
                    state: 'home'
                }
            ];

            var teacherNav = [
                {
                    name: 'Home',
                    state: 'home'
                }
            ];

            var guestNav = [
                {
                    name: 'Home',
                    state: 'home'
                }
            ];

            return {
              getNavigationMenu: function () {
                  var role = context.getRole();
                  switch (role) {
                      case 'admin':
                          return adminNav;
                      case 'user':
                          return userNav;
                      case 'teacher':
                          return teacherNav;
                      case 'guest':
                          return guestNav;
                  }
              }
            };
        }])
})();