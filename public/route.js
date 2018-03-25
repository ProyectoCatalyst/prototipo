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
        controller: 'controladorMain',
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
      
      .state('main.registroSucursales', {
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


      .state('main.editarSucursal', {
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

        .state('main.listarSucursales', {
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

        .state('main.prealertarPaquetes', {
          url: '/prealertarPaquetes',
          templateUrl: './components/paquetes/prealertarPaquete/prealertaPaquete.view.html',
          data: {
            pageTitle: 'Prealertar paquete | Inicio'
          },
          resolve: {
            load: ['$ocLazyLoad', ($ocLazyLoad) => {
              return $ocLazyLoad.load('./components/paquetes/prealertarPaquete/prealertarPaquete.controller.js')
            }]
          },
          controller: 'controladorPrealertarPaquete',
          controllerAs: 'vm'
        })
        
        .state('main.listarPaquetesPrealertados', {
          url: '/listarPaquetesPrealertados',
          templateUrl: './components/paquetes/listarPaquetesPrealertados/listarPaquetesPrealertados.view.html',
          data: {
            pageTitle: 'lista Paquetes prealertados | Inicio'
          },
          resolve: {
            load: ['$ocLazyLoad', ($ocLazyLoad) => {
              return $ocLazyLoad.load('./components/paquetes/listarPaquetesPrealertados/listarPaquetesPrealertados.controller.js')
            }]
          },
          params:{
            objPaqueteprealertado:''
          },
          controller: 'controladorlistaPaquetesPrealertados',
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
      })

      .state('listarTodosUsuarios', {
        url: '/ListaTodosUsuarios',
        templateUrl: './components/usuarios/listarTodosUsuarios/listarTodosUsuarios.view.html',
        data: {
          pageTitle: 'Lista de Usuarios | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/listarTodosUsuarios/listarTodosUsuarios.controller.js')
          }]
        },
        controller: 'controladorListarTodosUsuarios',
        controllerAs: 'vm'
      })

      .state('DesactivarUsuarios', {
        url: '/usuariosDesactivados',
        templateUrl: './components/usuarios/listarTodosUsuarios/listarTodosUsuarios.view.html',
        data: {
          pageTitle: 'Lista de Usuarios | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/listarTodosUsuarios/listarTodosUsuarios.controller.js')
          }]
        },
        controller: 'controladorListarTodosUsuarios',
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

    // $urlRouterProvider.otherwise('/');
  };
})();