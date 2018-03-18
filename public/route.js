(() => {
  'use strict';
  angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routing($stateProvider, $urlRouterProvider, $oclazyLoad) {

    $stateProvider
      .state('landingPage', {
        url: '/',
        templateUrl: './components/landingPage/landingPage.view.html',
        data: {
          pageTitle: 'Landing Page | Inicio'
        }
      })

      .state('registrarCliente', {
        url: '/registerCustomers',
        templateUrl: './components/usuarios/clientes/registrarClientes/registrarClientes.view.html',
        data: {
          pageTitle: 'Registrar Clientes | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/clientes/registrarClientes/registrarClientes.controller.js')
          }]
        },
        controller: 'controladorRegistrarCliente',
        controllerAs: 'vm'
      });


    // .state('', {
    //   url: '',
    //   templateUrl: '',
    //   data: {
    //     pageTitle: 'lorem | lorem'
    //   },
    //   resolve: {
    //     load: ['$ocLazyLoad', ($ocLazyLoad) => {
    //       return $ocLazyLoad.load('')
    //     }]
    //   },
    //   controller: '',
    //   controllerAs: 'vm'
    // })

    $urlRouterProvider.otherwise('/');
  };
})();