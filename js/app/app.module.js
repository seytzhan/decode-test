(function() {
    'use strict';

    angular
        .module('dtApp', [
            'ui.router'
        ])
        .run(run);

    run.$inject = ['$rootScope'];

    function run($rootScope) {
        // Preloader
        $rootScope.loadPage = function () {
            $rootScope.pageLoaded = true;
        };
    }
})();
