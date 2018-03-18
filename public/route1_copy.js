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
      .state('registrarConvenio', {
        url: '/registrarConvenio',
        templateUrl: './components/convenio/registrarConvenio/registrarConvenio.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/convenio/registrarConvenio/registrarConvenio.controller.js')
          }]
        },
        data:{
          pageTitle: 'Registro de Convenios | Correos de Costa Rica'
        },
        controller: 'controladorRegistrarConvenio',
        controllerAs: 'vm'
      })
    
    ;


    $urlRouterProvider.otherwise('/');
  };
})();