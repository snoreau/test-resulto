
angular.module('testResulto').factory('eventService', ['$http', 
    function($http) {
        return {
            getAll: function () {
                return $http.get('http://frontend-test-1.resulto.ca/events/')
                    .then(function (response) {
                        return response.data;
                    }, function (httpError) {
                        throw httpError.status + " : " +  httpError.data;
                    });
            },

            getEvent: function (id) {
                return $http.get('http://frontend-test-1.resulto.ca/events/' + id)
                    .then(function (response) {
                        return response.data;
                    }, function (httpError) {
                        throw httpError.status + " : " +  httpError.data;
                    });                
            }
        };
    }
]);
