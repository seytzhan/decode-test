(function() {
    'use strict';

    angular
        .module('dtApp')
        .controller('TaskController', TaskController);

    TaskController.$inject = ['$scope', '$state'];

    function TaskController ($scope, $state) {
        var vm = this;

        vm.createTask = createTask;
        
        function createTask () {
            
        }
    }
})();
