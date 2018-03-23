(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorPrealertarPaquete', controladorPrealertarPaquete);

  controladorPrealertarPaquete.$inject = ['$stateParams', '$state', '$http', 'servicioPaquetes'];

  function controladorPrealertarPaquete($stateParams, $state, $http, servicioPaquetes) {
    let vm = this;

    vm.tipoPaquetes = $http({
      method: 'GET',
      url: './sources/data/tipoPaquete.json'
    }).then(function (success) {
      vm.tipoPaquetes = success.data
    }, function (error) {
      console.log("Ocurrió un error tipoPaquete" + error);
    });//tipoPaquete

    vm.nuevoPaquetePrealertado = {};

    vm.nuevoPaquetePrealertado.trackingPaquete = servicioPaquetes.numeroTracking();
    vm.listaPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

    listarPaquetesPrealertados();
    vm.prealertarPaquete = (pnuevoPaquetePrealertado) => {
      console.log(pnuevoPaquetePrealertado);

      pnuevoPaquetePrealertado.estadoPaquete = 'Prealertado';

      let objNuevoPaquetePrealertado = new Paquete(pnuevoPaquetePrealertado.trackingPaquete, pnuevoPaquetePrealertado.tipoPaquete, pnuevoPaquetePrealertado.estadoPaquete);
//pnuevoPaquetePrealertado.costoTotalPaquete
      console.log('objeto con paquete');
      console.log(objNuevoPaquetePrealertado);

      let codigoValidado = servicioPaquetes.prealertarPaquete(objNuevoPaquetePrealertado);

      if (codigoValidado == true) {
        swal({
          title: "Paquete prealertado!",
          text: "El paquete se ha prealertado exitosamente",
          icon: "success",
          button: "Aceptar"
        });
      } else {
        swal({
          title: "Error",
          text: "ha ocurrido un error interno por favor vuelva intentarlo",
          icon: "error",
          button: "Aceptar"
        });
      }//fin else

      vm.nuevoPaquetePrealertado = null;
      listarPaquetesPrealertados();

    }// fin vm.prealertar paquetes

    vm.listarPaquetesPrealertados = () => {
      $state.go('main.listarPaquetesPrealertados')
    }

    function listarPaquetesPrealertados() {
      vm.listaPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();
    }

  }// fin de la función controladorPrealertarPaquete
})();