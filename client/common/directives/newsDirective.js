angular.module('directives').directive('newsDirective', ['$state', function($state) {
    return {
        restrict: 'E',
        templateUrl: 'common/directives/newsDirective-template.html',
        scope: {
            model: '='
        },
        link: function(scope, elem, attrs) {
            scope.model.list.then(function(result){
                scope.model.list = result;
            });
            scope.newsButtonClick = function(){
                $state.go(scope.model.goTo);
            };
            scope.goToStat = function() {
                $state.go('statistics');
            }
        }
    };
}]);
