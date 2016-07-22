(function () {
    'use strict';

    angular
        .module('dtApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$state', '$timeout', '$http', 'Auth', '$uibModalInstance', 'Kalkan'];

    function LoginController($rootScope, $state, $timeout, $http, Auth, $uibModalInstance, Kalkan) {
        var vm = this;

        vm.authenticationError = false;
        vm.cancel = cancel;
        vm.credentials = {};
        vm.chooseCert = chooseCert;
        vm.enterByCert = enterByCert;
        vm.login = login;
        vm.password = null;
        vm.register = register;
        vm.rememberMe = true;
        vm.requestResetPassword = requestResetPassword;
        vm.username = null;

        $timeout(function () {
            angular.element('#username').focus();
        });

        function cancel() {
            vm.credentials = {
                username: null,
                password: null,
                rememberMe: true
            };
            vm.authenticationError = false;
            $uibModalInstance.dismiss('cancel');
        }

        function login(event) {
            event.preventDefault();
            Auth.login({
                username: vm.username,
                password: vm.password,
                rememberMe: vm.rememberMe
            }).then(function () {
                vm.authenticationError = false;
                $uibModalInstance.close();
                if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                    $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                    $state.go('home');
                }

                $rootScope.$broadcast('authenticationSuccess');

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                if (Auth.getPreviousState()) {
                    var previousState = Auth.getPreviousState();
                    Auth.resetPreviousState();
                    $state.go(previousState.name, previousState.params);
                }
            }).catch(function () {
                vm.authenticationError = true;
            });
        }

        function chooseCert() {
            Kalkan.chooseStoragePath();
        }

        function enterByCert() {
            if ($rootScope.kalkan && $rootScope.kalkan.subjectDn && $rootScope.kalkan.subjectDn.iin) {
                var xmlToSign = '<?xml version="1.0" encoding="utf-8"?>'
                    + '<root>'
                    + '<name>' + $rootScope.kalkan.subjectDn.fio + '</name>'
                    + '<iin>' + $rootScope.kalkan.subjectDn.iin + '</iin>'
                    + '</root>';
                Kalkan.signXML(xmlToSign).then(
                    function (payload) {
                        var requestData = 'signature=' + encodeURIComponent(payload);
                        console.log("signedXml: " + requestData);
                        var result = $http.post('api/kalkan_authentication', requestData, {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        });
                        result.success(function (data, status, headers, config) {
                            vm.authenticationError = false;
                            $uibModalInstance.close();
                            if ($state.current.name === 'register' || $state.current.name === 'activate' ||
                                $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
                                $state.go('home');
                            }

                            $rootScope.$broadcast('authenticationSuccess');

                            // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                            // since login is succesful, go to stored previousState and clear previousState
                            if (Auth.getPreviousState()) {
                                var previousState = Auth.getPreviousState();
                                Auth.resetPreviousState();
                                $state.go(previousState.name, previousState.params);
                            }
                        });
                        result.error(function (data, status, headers, config) {
                            console.log(data);
                            vm.authenticationError = true;
                        });
                    },
                    function (errorPayload) {
                        console.log('Ошибка подписи XML:' + errorPayload);
                    }
                );

            } else {
                alert("Не выбран ключ для аутентификации.");
            }
        }

        function register() {
            $uibModalInstance.dismiss('cancel');
            $state.go('register');
        }

        function requestResetPassword() {
            $uibModalInstance.dismiss('cancel');
            $state.go('requestReset');
        }
    }
})();
