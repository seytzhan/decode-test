(function () {
    'use strict';

    angular
        .module('dtApp')
        .factory('Task', Task);

    Task.$inject = ['$http'];

    function Task ($http) {
        var service = {
            load: load
        };
        
        return service;

        function load () {
            //TODO: load tasks from REST-API
            var tasks = [
                
            ];
            return tasks;
        }
    }
})();
