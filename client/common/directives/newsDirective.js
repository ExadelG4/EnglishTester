angular.module('directives').directive('newsDirective', ['$state', 'getStatisticsFromNews', function($state, getStatisticsFromNews) {
    return {
        restrict: 'E',
        templateUrl: 'common/directives/newsDirective-template.html',
        scope: {
            model: '='
        },
        controller: function($scope, userService) {
           $scope.model.reqList().then(function(result){
                $scope.model.list = result.data;
            });
            $scope.newsButtonClick = function(){
                $state.go($scope.model.goTo);
            };
            $scope.personClick = function() {
                alert($scope.model.typeFlag);
                getStatisticsFromNews.setPersonStatistic($scope.model.typeFlag);
                $state.go('statistics');

            }
        }
    };
}]);
