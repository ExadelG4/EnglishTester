angular.module('directives').directive('newsDirective', ['$state', function($state) {
    return {
        restrict: 'E',
        templateUrl: 'common/directives/newsDirective-template.html',
        scope: {
            model: '='
        },
        controller: function($scope, userService) {
           $scope.model.reqList().then(function(result){
                $scope.model.list = result.data;
               console.log(result.data);
            });
            $scope.newsButtonClick = function(){
                $state.go($scope.model.goTo);
            };
            $scope.goToStat = function() {
                $state.go('statistics');
            }
        }
    };
}]);
