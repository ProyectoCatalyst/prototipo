(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioPaquetes', servicioPaquetes);

  servicioPaquetes.$inject = ['$q', '$log', '$http'];
  function servicioPaquetes($q, $log, $http) {

    let publicAPI = {
      prealertarPaquete: _prealertarPaquete,
      retornarPaquetesPrealertados: _retornarPaquetesPrealertados,
      numeroTracking: _numeroTracking
    }
    return publicAPI;

    function _prealertarPaquete(pnuevoPaquetePrealertado) {

      let listaPaquetesPrealertados = _retornarPaquetesPrealertados();
      let tamanno = listaPaquetesPrealertados.length;
      let validarCodigo = true;
      for (let i = 0; i < tamanno; i++) {
        if (pnuevoPaquetePrealertado.capturarTrackingPaquete() == listaPaquetesPrealertados[i].capturarTrackingPaquete()) {
          validarCodigo == false;
        }
      }
      if (validarCodigo == true) {
        listaPaquetesPrealertados.push(pnuevoPaquetePrealertado);
        localStorage.setItem('listaPaquetesPrealertadosLS', JSON.stringify(listaPaquetesPrealertados));
      }
      return validarCodigo;
    }//fin prealertar paquete

    function _retornarPaquetesPrealertados() {
      let listaPaquetesPrealertados = [];
      let listaPaquetesPrealertadosLocal = JSON.parse(localStorage.getItem("listaPaquetesPrealertadosLS"));

      if (listaPaquetesPrealertadosLocal == null) {
        listaPaquetesPrealertados = [];
      } else {
        listaPaquetesPrealertadosLocal.forEach(obj => {
          let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.tipoPaquete, obj.estadoPaquete);

          listaPaquetesPrealertados.push(objPaquetesPrealertados)
        });
      }
      return listaPaquetesPrealertados;
    }//fin retornar PaquetesPrealertados

    function _numeroTracking() {
      let numeroTracking = 0, numeroMin = 1, numeroMax = 99999;
      numeroTracking = Math.round((Math.random() * 9999999) + 1);
      return numeroTracking;
    }
  }
})();