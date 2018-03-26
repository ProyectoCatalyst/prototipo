(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorModificarEstadoPaquete', controladorModificarEstadoPaquete);

  controladorModificarEstadoPaquete.$inject = ['$stateParams', '$state', '$http', 'servicioPaquetes'];

  function controladorModificarEstadoPaquete($stateParams, $state, $http, servicioPaquetes) {

    if(!$stateParams.objPaqueteModEstado){
      $state.go('main.listarPaquete'); // que vaya a otra vista cuando no encuntre la info transferida.
    }

    let vm = this;

    let objPaqueteModSinFormato = JSON.parse($stateParams.objPaqueteModEstado);

    let objPaquetesModTemp = new Paquete(objPaqueteModSinFormato.trackingPaquete, objPaqueteModSinFormato.tipoPaquete, objPaqueteModSinFormato.pesoPaquete, objPaqueteModSinFormato.precioPaquete, objPaqueteModSinFormato.estadoPaquete);

    vm.informacionPaquete = objPaqueteModSinFormato;

    vm.PaquetesPrealertadosMod = {};

    vm.estadosPaquetes = $http({
      method: 'GET',
      url: './sources/data/estadosPaquetes.json'
    }).then(function (success) {
      vm.estadosPaquetes = success.data
    }, function (error) {
    });//estadoPaquete

    vm.actualizarPaquete = (PaquetesPrealertadosMod) => {

      PaquetesPrealertadosMod.trackingPaquete = objPaquetesModTemp.trackingPaquete;
      PaquetesPrealertadosMod.tipoPaquete = objPaquetesModTemp.tipoPaquete;
      PaquetesPrealertadosMod.pesoPaquete = objPaquetesModTemp.pesoPaquete;
      PaquetesPrealertadosMod.precioPaquete = objPaquetesModTemp.precioPaquete;

      
      let objPaqueteFormato = new Paquete(PaquetesPrealertadosMod.trackingPaquete, PaquetesPrealertadosMod.tipoPaquete, PaquetesPrealertadosMod.pesoPaquete, PaquetesPrealertadosMod.precioPaquete, PaquetesPrealertadosMod.estadosPaquetes.name);

      servicioPaquetes.modificarEstado(objPaqueteFormato); // envia todo el objeto, compara cada paquete ne el sistema con el codigo del paquete nuevo pmodificarEstado.convenio = paqueteLS[i].convenio

      
        swal({
          title: "Actualización exitosa",
          text: "estado actualizado correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('main.listarPaquetesPrealertados');
      }
      

    vm.regresar = () => {
      $state.go('main.listarPaquetesPrealertados');
    }
  }
})();