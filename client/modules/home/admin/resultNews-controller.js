(function(){
    angular.module('home').controller('resultNewsCtrl', ['$scope', 'userService', function($scope, userService){
        $scope.resNews = [];
        userService.getResults().then(function(data){
            data.forEach(function(item, i) {
                $scope.resNews[i] = item;
                $scope.resNews[i].fullName = item.firstName + ' ' + item.lastName;
            });
        })
    }])
})();