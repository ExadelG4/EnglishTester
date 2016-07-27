(function(){
    angular.module('profile', []).controller('editProfileController',['$scope', 'context', function($scope, context){
        var fullName = context.getFirstName() + ' ' + context.getLastName();
        $scope.userProfile = {
            name: fullName,
            email: context.getEmail(),
            telNumber: context.getNumber()
        };

        $scope.role = context.getRole();

        $scope.disable1 = true;
        $scope.disable2 = true;

        $scope.onFrstInput = function() {
            $scope.disable1 = false;
        };

        $scope.onScndInput = function() {
            $scope.disable2 = false;
        };

        $scope.changeMail = function() {
            $scope.userProfile.email = $scope.mail;
        };

        $scope.changeTelNumber = function() {
            $scope.userProfile.telNumber = $scope.telNbr;
            console.log($scope.telNbr);
        };

        $scope.save = function() {
            $scope.disable1 = true;
            $scope.disable2 = true;
        };


    }]);

})();