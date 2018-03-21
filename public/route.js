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
        templateUrl: './components/repartidor/registrarRepartidor/registrarRepartidor.view.html',
        data: {
          pageTitle: 'Registrar repartidor | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/repartidor/registrarRepartidor/registrarRepartidor.controller.js')
          }]
        },
        controller: 'controladorRegistrarRepartidor',
        controllerAs: 'vm'
      })
      
      .state('registrarLincencia', {
        url: '/registerLicence',
        templateUrl: './components/licencia/registrarLicencia/registrarLincencia.view.html',
        data: {
          pageTitle: 'Registrar licencia | Correos CR'
        },
        params: {
          datos: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/licencia/registrarLicencia/registrarLincencia.controller.js')
          }]
        },
        controller: 'controladorRegistrarLicencia',
        controllerAs: 'vm'
      })
      
      .state('listarLicencias', {
        url: '/listLicenses',
        templateUrl: './components/licencia/listarLicencias/listarLicencias.view.html',
        data: {
          pageTitle: 'Listar licencias | Correos CR'
        },
        params: {
          datos: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/licencia/listarLicencias/listarLicencias.controller.js')
          }]
        },
        controller: 'controladorListarLicencias',
        controllerAs: 'vm'
      })
      
      .state('listarTodosLosRepartidores', {
        url: '/listAllDeliveryMan',
        templateUrl: './components/repartidor/listarTodosLosRepartidores/listarTodosLosRepartidores.view.html',
        data: {
          pageTitle: 'Lista todos repartidores | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/repartidor/listarTodosLosRepartidores/listarTodosLosRepartidores.controller.js')
          }]
        },
        controller: 'controladorListaTodosRepartidores',
        controllerAs: 'vm'
      })
      
      .state('perfilRepartidor', {
        url: '/deliverManProfile',
        templateUrl: './components/repartidor/perfilRepartidor/perfilRepartidor.view.html',
        data: {
          pageTitle: 'Perfil repartidor | Correos CR'
        },
        params: {
          datos: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/repartidor/perfilRepartidor/perfilRepartidor.controller.js')
          }]
        },
        controller: 'controladorPerfilRepartidor',
        controllerAS: 'vm'
      })

      .state('main', {
        url: '/main',
        templateUrl: './components/main/main.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/main.controller.js')
          }]
        },
        data: {
          pageTitle: 'Inicio | Correos de Costa Rica'
        },
        controller: '',
        controllerAs: 'vm'
      })

      .state('main.registrarEncargadoAduana', {
        url: '/registroEncargadoAduana',
        templateUrl: './components/usuarios/encargadoAduanas/registrarEncargadoAduanas/registrarEncargadoAduana.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/encargadoAduanas/registrarEncargadoAduanas/registrarEncargadoAduanas.controller.js')
          }]
        },
        data: {
          pageTitle: 'Encargado Aduanas | Registrar'
        },
        controller: 'controladorRegistroEncargadoAduana',
        controllerAs: 'vm'
      })

      .state('main.registrarEncargadoSucursal', {
        url: '/registroEncargadoSucursal',
        templateUrl: './components/usuarios/encargadoSucursal/registrarEncargadoSucursal/registrarEncargadoSucursal.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/encargadoSucursal/registrarEncargadoSucursal/registrarEncargadoSucursal.controller.js')
          }]
        },
        data: {
          pageTitle: 'Encargado Sucursal | Regitrar'
        },
        controller: 'controladorRegistroEncargadoSucursal',
        controllerAs: 'vm'
      })
      
      .state('main.registrarCliente', {
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