(function () {
    'use strict';
    
    angular.module('home')
        .controller('userHomeController', ['$scope', '$state', 'userService', 'context', 'notification', 'recorderService', 
            function($scope, $state, userService, context, notification, recorderService) {

            $scope.disStart;
            $scope.disReq;
            $scope.status;
            $scope.firstName = context.getFirstName();
            $scope.lastName = context.getLastName();
            $scope.dataStart;
            $scope.dataEnd;


            $scope.updateButtons = function () {
                $scope.disStart = true;
                $scope.disReq = true;
                if ($scope.status === 'open') {
                    $scope.disStart = false;
                    $scope.disReq = true;
                }
                else if($scope.status === 'free') {
                    $scope.disStart = true;
                    $scope.disReq = false;
                }
                else if($scope.status === 'req' || $scope.status === 'stack') {
                    $scope.disStart = true;
                    $scope.disReq = true;
                }
            }

            $scope.update = function() { 
                    userService.getStatus().then(function (data) {
                        $scope.status = data.status;
                        if($scope.status === 'open') {
                            $scope.dateStart = new Date(data.dateStart).toUTCString();
                            $scope.dateEnd = new Date(data.dateEnd).toUTCString();
                            //$scope.dateEnd = $scope.dateEnd2.splice(0, 4);
                            //$scope.dateStart = dateStart.getDate()+'.'+dateStart.getMonth()+'.'+ dateStart.getFullYear()+' '+ dateStart.getHours()+':'+ dateStart.getMinutes()+':'+dateStart.getSeconds();
                        }
                        $scope.updateButtons();
                });
            }
            $scope.onSendRequest = function() {
                userService.sendTestRequest().then( function() {
                    notification.success("You have successfully send request for test");
                    $scope.update();
                })
            };

            $scope.update();
            /*$scope.onStartTest = function() {
                userService.getTest();
                var 
            }*/

            $scope.save = function(){
                var c = recorderService.controller('audioInput');
                //c.save('avazaza');
                //$.get(window.URL.createObjectURL(c.audioModel), function(data) {
                     //alert(data);
                     var xhr = new XMLHttpRequest();

                      // обработчики можно объединить в один,
                      // если status == 200, то это успех, иначе ошибка
                      xhr.onload = xhr.onerror = function() {
                        if (this.status == 200) {
                          //log("success");
                        } else {
                          //log("error " + this.status);
                        }
                      };

                      // обработчик для закачки
                      xhr.upload.onprogress = function(event) {
                        log(event.loaded + ' / ' + event.total);
                      }

                      xhr.open("POST", "upload", true);
                      xhr.send(c.audioModel);
                //});
            }
        }]
    );
})();