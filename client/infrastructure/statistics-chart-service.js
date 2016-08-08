(function() {
    angular.module('myApp')
        .service('getObjToChart', ['$q', function($q){
            var modelStatistic;
            return {
                setPersonObj: function(item) {
                    modelStatistic = item;
                },

                getPersonPromise: function() {
                    return $q.when(modelStatistic);
                },

                getPersonObj: function () {
                    return modelStatistic;
                }

            }
        }])
})();