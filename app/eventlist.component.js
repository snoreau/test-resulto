
angular.module('testResulto').component('eventList', {
    templateUrl: '/templates/eventlist.html',
    controller: ['$scope', '$uibModal', 'filterFilter', 'eventService',
    function ($scope, $uibModal, filterFilter, eventService) {

        $scope.events = [];
        $scope.filterEvents = [];
        $scope.itemsPerPage = 5;
        
        $scope.getClass = function (value) {
            if (value == 'all-day') {
                return 'all-day';
            } else {
                if (util.parseTime(value) > 120) {
                    return 'two-hours';
                } else {
                    return '';
                }
            }
        }

        $scope.updateSearch = function () {
            var tmpEvents = [];

            if ($scope.filterText == "") {
                $scope.filterEvents = $scope.events;
                $scope.setPage(1);
            } else {
                tmpEvents = filterFilter($scope.events, { date: $scope.filterText});
                if (tmpEvents.length == 0) {
                    tmpEvents = filterFilter($scope.events, { title: $scope.filterText});
                }
                $scope.filterEvents = tmpEvents;
                $scope.setPage(1);
            }
        }

        $scope.setPage = function (newpage) {
            if (newpage !== undefined) {
                $scope.currentPage = newpage;
            }

            var pagedData = $scope.filterEvents.slice(($scope.currentPage - 1) * $scope.itemsPerPage,
                $scope.currentPage * $scope.itemsPerPage);
            $scope.pageEvents = pagedData;
        }
 
        $scope.showDetail = function (event, backgroundClass) {
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/eventdetail.html',
                controller: ['$scope', '$uibModalInstance', 'eventService',
                function ($scope, $uibModalInstance, eventService) {
                    $scope.close = function () {
                        $uibModalInstance.close();
                    }

                    $scope.event = event;
                    $scope.event.backgroundClass = backgroundClass;

/* Le serveur retourne une erreur
                     eventService.getEvent(id)
                        .then(function (data) {
                            $scope.event = data;
                            console.log($scope.event);
                        }, function (error) {
                            console.error("Une erreur est survenue lors de la demande de données.");                
                        });
 */                        
                }]
            });
        }

        eventService.getAll()
            .then(function (data) {
                $scope.events = data.event_list;
                $scope.events.sort(function (a, b) {
                    if (a.date < b.date) {
                        return -1;
                    }
                    if (a.date > b.date) {
                        return 1;
                    }
                    return 0;
                });

                $scope.filterEvents = $scope.events;
                $scope.setPage(1);
            }, function (error) {
                console.error("Une erreur est survenue lors de la demande de données.");
            });
     }]
});
