(function() {
    'use strict';

    angular
        .module('dtApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state'];

    function NavbarController ($state) {
        var vm = this;

        vm.login = login;
        vm.logout = logout;
        vm.$state = $state;

        function login() {
        }

        function logout() {
        }

    }
})();
