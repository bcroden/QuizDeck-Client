(function () {
    'use strict';

    angular
        .module('app')
        .component('qdQuizManagement', {
            controller: Controller,
            templateUrl: 'app/routes/quiz-management/qd-quiz-management.html',
        });

    /* @ngInject */
    function Controller($location, $http, $timeout, serverUrl) {
        var vm = this;

        vm.getFilteredQuizes = getFilteredQuizes;
        vm.searchWithFilter = searchWithFilter;

        vm.$onInit = function() {
            searchWithFilter();
        };
        
        vm.$postLink = function() {
        }

        ////////////////

        var dataFromServer = {};
        var listOfData = {};

        function searchWithFilter() {
            if (vm.waiting)
                return;

            vm.waiting = true;

            var searchFilter = vm.searchCriteria;
            listOfData = {};
            $http
                .get(serverUrl + '/rest/secure/quiz/searchBySelf').then(function(response) {
                    vm.waiting = false;
                    dataFromServer = response.data;
                    dataFromServer.forEach(function(quiz) {
                        quiz.categories.forEach(function(category) {
                            listOfData[category] = listOfData[category] || [];
                            if (searchFilter == null || searchFilter == '') {
                                listOfData[category].push(quiz);
                            } else {
                                if (quiz.labels == searchFilter) {
                                    listOfData[category].push(quiz);
                                }
                            }
                        });
                    });
                    $timeout(function () {
                        $(document).ready(function () {
                            $('.collapsible').collapsible({ accordion: false });
                        });
                    }, 100);
                })
                .catch(function () {
                    vm.waiting = false;
                });
        }

        function getFilteredQuizes() {
            return listOfData;
        }
    }
})();
