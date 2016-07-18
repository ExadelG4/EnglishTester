(function(){
    angular.module('admin').controller('assignStdController', ['$scope', 'userService', function($scope, userService) {
        $scope.students = [];
        userService.getUsers().then(function(data) {
            data.forEach(function(item, i) {
                $scope.students[i] = item;
            });
        });

        $scope.chooseUserList = [];

        $scope.hasChanged = function(item){
            var fullName = item.firstName + '' + item.lastName;
            $scope.chooseUserList.push(fullName);
           console.log($(this));
        };

        $scope.reset = function(){
            $scope.chooseUserList = [];
        };

        $scope.toRight = function() {
            $('.myHide').css('transform', 'translate(0px');
            $('.myHide').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            $('.right-collapse').hide();
            $('.left-collapse').show();
        };

        $scope.toLeft = function() {
            $('.myHide').css('transform', 'translate(-250px)');
            $('.myHide').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            $('.left-collapse').hide();
            $('.right-collapse').show();
        };

        (function(){
            $('.right-collapse').hide();
            $('.left-collapse').show();
        })();
    }]);
})();

