(function() {
    'use strict';

    angular
        .module('dtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('tasks', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'js/app/task/tasks.html',
                    controller: 'TaskController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
