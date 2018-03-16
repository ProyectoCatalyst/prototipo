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

      //.state('registrarSucursal', {
         //url: '/registerBranchOffice',
         //templateUrl: './components/sucursales/registrarSucursal/registrarSucursal.view.html',
         //data: {
           //pageTitle: 'Listar sucursales | prototipo'
         //},
         //resolve: {
           //load: ['$ocLazyLoad', ($ocLazyLoad) => {
             //return $ocLazyLoad.load//('./components/sucursales/registrarSucursal/registrarSucursal.controller.js')
           //}]
         //},
         /*controller: 'controladorRegistrarSucursal',
         controllerAs: 'vm'*/
       //})
       ;


    $urlRouterProvider.otherwise('/');
  }
  
  
  ;
})();