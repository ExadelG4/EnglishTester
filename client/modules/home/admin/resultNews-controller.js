(function(){
    angular.module('home').controller('resultNewsCtrl', ['$scope', '$state', '$rootScope', 'userService', 'getStatisticsFromNews', function($scope, $state, $rootScope, userService, getStatisticsFromNews){
        $scope.resNews = [];
        userService.getResults().then(function(data){
        	console.log(data);
            data.forEach(function(item, i) {
                $scope.resNews[i] = item;
                $scope.resNews[i].fullName = item.firstName + ' ' + item.lastName;

                $scope.resNews[i].fullTeacherName = item.teacherFirstName + ' ' + item.teacherLastName;

            });
        });

        $scope.showInfoNews = function(item) {
            console.log(item);
            getStatisticsFromNews.setPersonStatistic(item);
            $state.go('statistics');
        }
    }])
})();