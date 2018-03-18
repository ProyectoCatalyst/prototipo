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

      .state('registroSucursales', {
        url: '/registroSucursales',
        templateUrl: './components/sucursales/registrarSucursal/registrarSucursal.view.html',
        data: {
          pageTitle: 'Registro Sucursal | Inicio'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/sucursales/registrarSucursal/registrarSucursal.controller.js')
          }]
        },
        controller: 'controladorRegistrarSucursal',
        controllerAs: 'vm'
      })


      .state('editarSucursal', {
        url: '/editarSucursal',
          templateUrl: './components/sucursales/editarSucursales/editarSucursal.view.html',
          data: {
            pageTitle: 'Editar Sucursal | Inicio'
          },
          resolve: {
            load: ['$ocLazyLoad', ($ocLazyLoad) => {
              return $ocLazyLoad.load('./components/sucursales/editarSucursales/editarSucursal.controller.js')
            }]
          },
          params:{
            objSucursal:''
          },
          controller: 'controladorEditarSucursal',
          controllerAs: 'vm'
        })

        .state('listarSucursales', {
          url: '/listarSucursales',
          templateUrl: './components/sucursales/listarSucursales/listarSucursales.view.html',
          data: {
            pageTitle: 'lista Sucursales | Inicio'
          },
          resolve: {
            load: ['$ocLazyLoad', ($ocLazyLoad) => {
              return $ocLazyLoad.load('./components/sucursales/listarSucursales/listarSucursales.controller.js')
            }]
          },
          params:{
            objSucursal:''
          },
          controller: 'controladorlistaSucursales',
          controllerAs: 'vm'
        })
        ;

    $urlRouterProvider.otherwise('/');
  };
})();