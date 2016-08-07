angular.module('home').service('adminHomeService', ['userService', function(userService){


    this.newsList = [
        {
            reqList: userService.newsTypeOne,
            goTo: 'assignStd',
            imageLink: 'assets/images/icons/request.png',
            buttonText: 'Assign',
            messageText: 'asked to pass the test.'
        },
        {
            reqList: userService.newsTypeTwo,
            goTo: 'assignTch',
            imageLink: 'assets/images/icons/forCheck.png',
            buttonText: 'Assign',
            messageText: 'finished the test.'
        },
        {
            reqList: userService.newsTypeThree,
            goTo: 'statistics',
            imageLink: 'assets/images/icons/checkAll.png',
            buttonText: 'Statistics',
            messageText: 'ended the test.'
        }
    ]
}]);