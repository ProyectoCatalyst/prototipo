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

      .state('perfil', {
        url: '/perfil',
        templateUrl: './components/main/main.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/main/main.controller.js')
          }]
        },
        data: {
          pageTitle: 'Perfil | Correos CR'
        },
        controller: 'controladorPerfil',
        controllerAs: 'vm'
      })

      .state('404', {
        url: '/404',
        templateUrl: './404.html',
        data: {
          pageTitle: '404'
        }
      });;

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

    $urlRouterProvider.otherwise('/404');
  };
})();