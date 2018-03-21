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
        url: '/deliveryManProfile',
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
        controllerAs: 'vm'
      })
      
      .state('editarRepartidor', {
        url: '/modifyDeliveryMan',
        templateUrl: './components/repartidor/editarRepartidor/editarRepartidor.view.html',
        data: {
          pageTitle: 'Editar repartidor | Correos CR'
        },
        params: {
          datos: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/repartidor/editarRepartidor/editarRepartidor.controller.js')
          }]
        },
        controller: 'controladorEditarRepartidor',
        controllerAs: 'vm'
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
      })

      .state('inicioSesion', {
        url: '/inicioSesion',
        templateUrl: './components/login/login.view.html',
        data: {
          pageTitle: 'Inicio de Sesión | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/login/login.controller.js')
          }]
        },
        controller: 'controladorInicioSesion',
        controllerAs: 'vm'
      })

      .state('404', {
        url: '/404',
        templateUrl: './404.html',
        data: {
          pageTitle: '404'
        }
      })

      .state('main.registrarConvenio', {
        url: '/registrarConvenio',
        templateUrl: './components/convenio/registrarConvenio/registrarConvenio.view.html',
        data: {
          pageTitle: 'Registro de Convenios | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/convenio/registrarConvenio/registrarConvenio.controller.js')
          }]
        },
        controller: 'controladorRegistrarConvenio',
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