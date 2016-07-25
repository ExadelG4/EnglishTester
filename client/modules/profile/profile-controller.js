(function(){
    angular.module('profile', []).controller('profileController',['$scope', 'context', function($scope, context){
        var fullName = context.getFirstName() + ' ' + context.getLastName();
        $scope.userProfile = {
            name: fullName,
            email: context.getEmail(),
            telNumber: context.getNumber()
        };


    }]);

})();