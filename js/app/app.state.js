(function() {
    'use strict';

    angular
        .module('dtApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'js/app/layouts/navbar/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'sidebar@': {
                    templateUrl: 'js/app/layouts/sidebar/sidebar.html',
                    controller: 'SidebarController',
                    controllerAs: 'vm'
                },
                'modalbar@': {
                    templateUrl: 'js/app/layouts/modalbar/modalbar.html',
                    controller: 'ModalbarController',
                    controllerAs: 'vm'
                }
            }
        });
        $urlRouterProvider.otherwise('/');
    }
})();
