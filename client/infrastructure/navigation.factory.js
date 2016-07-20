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
                            name: 'Assign student',
                            state: 'assignStd'
                        },
                        {
                            name: 'Assign teacher',
                            state: 'assignTch'
                        },
                        {
                            name: 'New user',
                            state: 'newUser'
                        }
                    ]
                },
                {
                    name: 'Tests',
                    tabs: [
                        {
                            name: 'Add question',
                            state: 'addQuestion'
                        },
                        {
                            name: 'Edit question',
                            state: 'editQuestion'
                        }
                    ]
                },
                {
                    name: 'Contacts',
                    state: 'home'
                }
            ];

            var userNav = [
                {
                    name: 'Home',
                    state: 'home'
                },
                {
                    name: 'Contacts',
                    state: 'home'
                }
            ];

            var teacherNav = [
                {
                    name: 'Home',
                    state: 'home'
                },
                {
                    name: 'Contacts',
                    state: 'home'
                }
            ];

            var guestNav = [
                {
                    name: 'Home',
                    state: 'home'
                },
                {
                    name: 'Contacts',
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