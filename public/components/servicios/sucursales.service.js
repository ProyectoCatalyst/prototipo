(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioSucursales', servicioSucursales);

  servicioSucursales.$inject = ['$q', '$log', '$http'];

  function servicioSucursales($q, $log, $http) {

    const asyncLocalStorage = {
      setItem: function (key, value) {
        return Promise.resolve().then(() => {
          let response = true;
          localStorage.setItem(key, JSON.stringify(value));
          return response
        });
      }
    }// fin asyncLocalStorage

    let publicAPI = {
      agregarSucursal: _agregarSucursal,
      retornarSucursal: _retornarSucursal,
      editarSucursal: _editarSucursal,
      eliminarSucursal: _eliminarSucursal,
      cambiarEstado: _cambiarEstado,
      retornarSucursalesDesact: _retornarSucursalesDesact,
      retornarSucursalesAct: _retornarSucursalesAct
    }

    return publicAPI;

    function _agregarSucursal(psucursalNueva) {

      let listaSucursales = _retornarSucursal();
      let validarCodigo = true;
      let tamanno = listaSucursales.length;
      for (let i = 0; i < tamanno; i++) {
        if (psucursalNueva.capturarCodigoSucursal() == listaSucursales[i].capturarCodigoSucursal()) {
          validarCodigo = false;
        }
      }

      if (validarCodigo == true) {
        listaSucursales.push(psucursalNueva);
        localStorage.setItem('listaSucursales', JSON.stringify(listaSucursales));
      }
      return validarCodigo;
    }// fin función agregarSucursal

    function _retornarSucursal() {
   
      let listaSucursalesLocal = JSON.parse(localStorage.getItem("listaSucursales")),
      sucursalesTemp =[];

      if (listaSucursalesLocal == null) {
        
        return sucursalesTemp;
      } else {
        listaSucursalesLocal.forEach(obj => {

          let objSucursalesAct = new Sucursal(obj.codigoSucursal, obj.nombreSucursal, obj.provincia, obj.canton, obj.distrito, obj.estadoSucursal);

          sucursalesTemp.push(objSucursalesAct);

         
        })
      }

      return sucursalesTemp;
    }// fin función retornarSucursal


    function _editarSucursal(psucursalEditar) {
      let listaSucursales = _retornarSucursal(),
        valido = false;

      for (let i = 0; i < listaSucursales.length; i++) {
        if (psucursalEditar.capturarCodigoSucursal() == listaSucursales[i].capturarCodigoSucursal()) {
          listaSucursales[i] = psucursalEditar;
          valido = true;
        }
      }
      actualizarLocal(listaSucursales);
      return valido;
    }// fin función actualizarSucursal


    function _cambiarEstado(pobjSucursal) {
      let sucursalesLS = _retornarSucursal();

      for (let i = 0; i < sucursalesLS.length; i++) {
        if (sucursalesLS[i].capturarCodigoSucursal() == pobjSucursal.codigoSucursal) {
          sucursalesLS[i].estadoSucursal = !pobjSucursal.estadoSucursal;
        }
      }
      actualizarLista(sucursalesLS);
    }

    // retornar animadores activos, donde filtro los activos

    function _retornarSucursalesAct() {
      let sucursalesLS = JSON.parse(localStorage.getItem('sucursalesLS')),
        sucursalesAct = [],
        sucursalesActLS = [];
      // recibe del local bien.

      if (sucursalesLS == null) {
        return sucursalesActLS;
      } else {
        for (let i = 0; i < sucursalesLS.length; i++) {
          if (sucursalesLS[i].estadoSucursal == true) {
            sucursalesAct.push(sucursalesLS[i]);
          }
        }
        // filtrar los estado true

        sucursalesAct.forEach(objTemp => {
          let objSucursalesAct = new Sucursal(objTemp.codigoSucursal, objTemp.nombreSucursal, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.estadoSucursal);

          sucursalesActLS.push(objSucursalesAct);
        });

        // recorro obj con true y doy formato
        return sucursalesActLS
      }
    }

    // para animadores desactivados

    function _retornarSucursalesDesact() {
      let sucursalesLS = JSON.parse(localStorage.getItem('sucursalesLS')),
        sucursalesDesact = [],
        sucursalesDesactLS = [];
      // recibe del local bien.

      if (sucursalesLS == null) {
        return sucursalesDesactLS;
      } else {
        for (let i = 0; i < sucursalesLS.length; i++) {
          if (sucursalesLS[i].estadoSucursal == false) {
            sucursalesDesact.push(sucursalesLS[i]);
          }
        }
        // modifica bien el estado

        sucursalesDesact.forEach(objTemp => {
          let objSucursalesDesact = new Sucursal(objTemp.codigoSucursal, objTemp.nombreSucursal, objTemp.provincia, objTemp.canton, objTemp.distrito, objTemp.estadoSucursal);

          sucursalesDesactLS.push(objSucursalesDesact);
        });
        return sucursalesDesactLS
      }
    }

    function _agregarSucursalDesact(psucursalesLS) {
      localStorage.setItem('sucursalesLS', JSON.stringify(psucursalesLS));
    }


    function _eliminarSucursal(psucursalEliminar) {
      let listaSucursales = _retornarSucursal(),
        valido = false;

      for (let i = 0; i < listaSucursales.length; i++) {
        if (psucursalEliminar.capturarCodigoSucursal() == listaSucursales[i].capturarCodigoSucursal()) {
          listaSucursales.splice(i, 1);
          valido = true;
        }
      }
      actualizarLocal(listaSucursales);
      return valido;
    }//fin función eliminar sucursal

    function actualizarLocal(plistaActualizada) {
      localStorage.setItem('listaSucursalesLS', JSON.stringify(plistaActualizada));
    }

  }// fin servicioSucursales
})();