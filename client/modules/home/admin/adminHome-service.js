angular.module('home').service('adminHomeService', ['userService', function(userService){


    this.newsList = [
        {
            list: userService.newsTypeOne(),
            goTo: 'assignStd',
            imageLink: 'assets/images/icons/request.png',
            buttonText: 'Go to assign',
            messageText: 'asked to pass the test.'
        },
        {
            list: userService.newsTypeTwo(),
            goTo: 'assignTch',
            imageLink: 'assets/images/icons/forCheck.png',
            buttonText: 'Go to assign',
            messageText: 'finished the test.'
        }
    ]
}]);