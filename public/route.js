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
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/landingPage/login.controller.js')
          }]
        },
        controller: 'controladorInicioSesion',
        controllerAs: 'vm'
      })
      
      .state('main.registrarRapartidor', {
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
      
      .state('main.registrarLincencia', {
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
      
      .state('main.listarLicencias', {
        url: '/listLicenses',
        templateUrl: './components/licencia/listarLicencias/listarLicencias.view.html',
        data: {
          pageTitle: 'Listar licencias | Correos CR'
        },
        params: {
          correoActivo: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/licencia/listarLicencias/listarLicencias.controller.js')
          }]
        },
        controller: 'controladorListarLicencias',
        controllerAs: 'vm'
      })
      
      .state('main.listarTodosLosRepartidores', {
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
      
      .state('main.perfilRepartidor', {
        url: '/deliveryManProfile',
        templateUrl: './components/repartidor/perfilRepartidor/perfilRepartidor.view.html',
        data: {
          pageTitle: 'Perfil repartidor | Correos CR'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/repartidor/perfilRepartidor/perfilRepartidor.controller.js')
          }]
        },
        controller: 'controladorPerfilRepartidor',
        controllerAs: 'vm'
      })
      
      .state('main.editarRepartidor', {
        url: '/modifyDeliveryMan',
        templateUrl: './components/repartidor/editarRepartidor/editarRepartidor.view.html',
        data: {
          pageTitle: 'Editar repartidor | Correos CR'
        },
        params: {
          datosMod: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/repartidor/editarRepartidor/editarRepartidor.controller.js')
          }]
        },
        controller: 'controladorEditarRepartidor',
        controllerAs: 'vm'
      })

      .state('main.editarLicencia', {
        url: '/modifyLicense',
        templateUrl: './components/licencia/editarLicencia/editarLicencia.view.html',
        data: {
          pageTitle: 'Editar licencia | Correos CR'
        },
        params: {
          datosLicenciaMod: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/licencia/editarLicencia/editarLicencia.controller.js')
          }]
        },
        controller: 'controladorEditarLicencia',
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
        controller: 'controladorMain',
        controllerAs: 'vm'
      })

      .state('main.registrarEncargadoAduana', {
        url: '/registerCustomsManager',
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
        url: '/registerBranchManager',
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

      .state('registrarCliente', {
        url: '/registerCustomers',
        templateUrl: './components/usuarios/clientes/registrarClientes/registrarClientesFuera.view.html',
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
          pageTitle: 'Registro Sucursal | Sucursal'
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
          pageTitle: 'Editar Sucursal | Sucursal'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/sucursales/editarSucursales/editarSucursal.controller.js')
          }]
        },
        params: {
          objSucursal: ''
        },
        controller: 'controladorEditarSucursal',
        controllerAs: 'vm'
      })

      .state('main.listarSucursales', {
        url: '/listarSucursales',
        templateUrl: './components/sucursales/listarSucursales/listarSucursales.view.html',
        data: {
          pageTitle: 'lista Sucursales | Sucursales'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/sucursales/listarSucursales/listarSucursales.controller.js')
          }]
        },
        params: {
          objSucursal: ''
        },
        controller: 'controladorlistaSucursales',
        controllerAs: 'vm'
      })

      .state('main.prealertarPaquetes', {
        url: '/prealertarPaquetes',
        templateUrl: './components/paquetes/prealertarPaquete/prealertaPaquete.view.html',
        data: {
          pageTitle: 'Prealertar paquete | Paquete'
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
          pageTitle: 'lista Paquetes prealertados | Paquetes'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/listarPaquetesPrealertados/listarPaquetesPrealertados.controller.js')
          }]
        },
        params: {
          objPaqueteprealertado: ''
        },
        controller: 'controladorlistaPaquetesPrealertados',
        controllerAs: 'vm'
      })


      .state('main.estadoPaquete', {
        url: '/estadoPaquete',
        templateUrl: './components/paquetes/mostrarEstadoPaquete/mostrarEstadoPaquete.view.html',
        data: {
          pageTitle: 'Estado paquete | Paquetes'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/mostrarEstadoPaquete/mostrarEstadoPaquete.controller.js')
          }]
        },
        params: {
          objPaqueteEstado: ''
        },
        controller: 'controladorMostrarEstadoPaquete',
        controllerAs: 'vm'
      })

      .state('main.modificarEstadoPaquete', {
        url: '/modificarEstadoPaquete',
        templateUrl: './components/paquetes/modificarEstadoPaquete/modificarEstadoPaquete.view.html',
        data: {
          pageTitle: 'modificar estado paquete | paquete'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/paquetes/modificarEstadoPaquete/modificarEstadoPaquete.controller.js')
          }]
        },
        params: {
          objPaqueteModEstado: ''
        },
        controller: 'controladorModificarEstadoPaquete',
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

      .state('main.listarTodosUsuarios', {
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

      .state('main.DesactivarUsuarios', {
        url: '/usuariosDesactivados',
        templateUrl: './components/usuarios/DesactivarUsuarios/desactivarUsuarios.view.html',
        data: {
          pageTitle: 'Lista de Usuarios | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/DesactivarUsuarios/desactivarUsuarios.controller.js')
          }]
        },
        controller: 'controladorListarDesactivados',
        controllerAs: 'vm'
      })

      .state('editarEncargadoAduana', {
        url: '/editarEncargadoAduana',
        templateUrl: './components/usuarios/encargadoAduanas/editarEncargadoAduana/editarEncargadoAduana.view.html',
        data: {
          pageTitle: 'Editar Perfil | Correos de Costa Rica'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/encargadoAduanas/editarEncargadoAduana/editarEncargadoAduana.controller.js')
          }]
        },
        controller: 'controladorEditarEncargadoAduana',
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