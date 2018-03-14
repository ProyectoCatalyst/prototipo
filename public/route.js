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
      
      .state('registrarRapartidor', {
        url: '/registerDeliveryMan',
        templateUrl: './components/registrarRepartidor/registrarRepartidor.view.html',
        data: {
          pageTitle: 'Registrar repartidor | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/registrarRepartidor/registrarRepartidor.controller.js')
          }]
        },
        controller: 'controladorRegistrarRepartidor',
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