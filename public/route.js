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

      .state('RegistrarEncargadoAduana', {
       url: '/registroEncargadoAduana',
       templateUrl:'./components/usurios/administrador/registrarEncargadoAduana/registrarEncargadoAduana.view.html', 
      
      resolve: {
        load: ['$ocLazyLoad.load', ($oclazyLoad)=>{
          return $ocLazyLoad.load('./components/usuarios/administrador/registrarEncargadoAduana/registrarEncargadoAduana.controller.js')
        }]
      },
      data: {
        pageTitle: 'Encargado Aduanas | Registrar'
      },
      controller: '',
      controllerAs: 'vm'
      })

      .state('registrarEncargadoSucursal', {
        url: '/registroEncargadoSucursal',
        templateUrl: './components/usurios/administrador/registrarEncargadoSucursal/registrarEncargadoSucursal.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usurios/administrador/registrarEncargadoSucursal/registrarEncargadoSucursal.controller.js')
          }]
        },
        data:{
          pageTitle: 'Encargado Sucursal | Regitrar'
        },
        controller: 'controladorRegistrarUsuario',
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