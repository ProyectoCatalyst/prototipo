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
    }, function (error) { }); //tipoPaquete

    vm.tipoMensajero = $http({
      method: 'GET',
      url: './sources/data/tipoMensajero.json'
    }).then(function (success) {
      vm.tipoMensajero = success.data
    }, function (error) {
    }); //tipoMensajero

    vm.nuevoPaquetePrealertado = {};

    vm.nuevoPaquetePrealertado.trackingPaquete = servicioPaquetes.numeroTracking();

    vm.nuevoPaquetePrealertado.impuestoPaquete = servicioPaquetes.numeroTracking();

    vm.nuevoPaquetePrealertado.costoTotalPaquete = servicioPaquetes.numeroTracking();

    listarPaquetesPrealertados();
    vm.prealertarPaquete = (pnuevoPaquetePrealertado) => {

      pnuevoPaquetePrealertado.estadoPaquete = 'Prealertado';

      let objNuevoPaquetePrealertado = new Paquete(pnuevoPaquetePrealertado.trackingPaquete, pnuevoPaquetePrealertado.tipoPaquete, pnuevoPaquetePrealertado.pesoPaquete, pnuevoPaquetePrealertado.precioPaquete, pnuevoPaquetePrealertado.estadoPaquete, pnuevoPaquetePrealertado.impuestoPaquete, pnuevoPaquetePrealertado.costoTotalPaquete);


      let codigoValidado = servicioPaquetes.prealertarPaquete(objNuevoPaquetePrealertado);

      if (codigoValidado == true) {
        swal({
          title: "Paquete prealertado!",
          text: "El paquete se ha prealertado exitosamente",
          icon: "success",
          button: "Aceptar"
        });
        $state.reload();
      } else {
        swal({
          title: "Error",
          text: "ha ocurrido un error interno por favor vuelva intentarlo",
          icon: "error",
          button: "Aceptar"
        });
        $state.reload();
      } //fin else

      vm.nuevoPaquetePrealertado = null;
      listarPaquetesPrealertados();

    } // fin vm.prealertar paquetes

    vm.listarPaquetesPrealertados = () => {
      $state.go('main.listarPaquetesPrealertados')
    }

    function listarPaquetesPrealertados() {
      vm.listaPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();
    }


  } // fin de la función controladorPrealertarPaquete
})();