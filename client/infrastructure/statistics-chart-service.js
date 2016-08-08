(function() {
    angular.module('myApp')
        .service('getObjToChartCtrl', [function(){
            var modelStatistic;
            return {
                setPersonObj: function(item) {
                    modelStatistic = item;
                },

                getPersonObj: function() {
                    return modelStatistic;
                }

            }
        }])
})();