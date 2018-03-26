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
      numeroTracking: _numeroTracking,
      encontrarEstadoActivo: _encontrarEstadoActivo,
      modificarEstado: _modificarEstado 
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
          let objPaquetesPrealertados = new Paquete(obj.trackingPaquete, obj.tipoPaquete, obj.pesoPaquete, obj.precioPaquete, obj.estadoPaquete);

          listaPaquetesPrealertados.push(objPaquetesPrealertados)
        });
      }
      return listaPaquetesPrealertados;
    }//fin retornar PaquetesPrealertados

    function _numeroTracking() {
      let numeroTracking = 0;
      numeroTracking = Math.round((Math.random() * 93979293));
      return numeroTracking;
    }

    function _encontrarEstadoActivo(pobjPaqueteTemp) {
      let paqueteEncontrado = [];
      let listaPaquetesPrealertados = _retornarPaquetesPrealertados();
      let tamanno = listaPaquetesPrealertados.length;
      for (let i = 0; i < tamanno; i++) {
        if (pobjPaqueteTemp.estadoPaquete == listaPaquetesPrealertados[i].capturarTrackingPaquete()) {
          paqueteEncontrado = listaPaquetesPrealertados[i].capturarEstadoPaquete()
        }
      }
      return paqueteEncontrado;
    }

    function _modificarEstado(PaquetesPrealertadosMod) { // recibo el nueva informacion
      let listaPaquetes = _retornarPaquetesPrealertados(); // recibo todos los paquetes del sistema

      for (let i = 0; i < listaPaquetes.length; i++) {
        if (PaquetesPrealertadosMod.trackingPaquete == listaPaquetes[i].capturarTrackingPaquete()) {
          listaPaquetes[i] = PaquetesPrealertadosMod;
        }
      }
      actualizarListaPaquetes(listaPaquetes);
    }// fin función actualizarEstado


    function actualizarListaPaquetes(listaPaquetes) {
      localStorage.setItem('listaPaquetesPrealertadosLS', JSON.stringify(listaPaquetes));
    }
  }
})();