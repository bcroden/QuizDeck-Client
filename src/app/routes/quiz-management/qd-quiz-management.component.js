(function () {
    'use strict';

    angular
        .module('app')
        .component('qdQuizManagement', {
            controller: Controller,
            templateUrl: 'app/routes/quiz-management/qd-quiz-management.html',
        });

    /* @ngInject */
    function Controller($location, $http) {
        var vm = this;

        vm.getFilteredQuizes = getFilteredQuizes;
        vm.searchWithFilter = searchWithFilter;

        vm.$onInit = function() {
            searchWithFilter();
        };

        ////////////////

        var dataFromServer = {};
        var listOfData = {};

        function searchWithFilter() {
            if (vm.waiting)
                return;

            vm.waiting = true;

            var searchFilter = vm.searchCriteria;
            listOfData = {};
            $http.get('https://quizdeckserver.herokuapp.com/rest/secure/quiz/searchBySelf').then(function (response) {
                vm.waiting = false;
                dataFromServer = response.data;
                dataFromServer.forEach(function (quiz) {
                    quiz.categories.forEach(function (category) {
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
