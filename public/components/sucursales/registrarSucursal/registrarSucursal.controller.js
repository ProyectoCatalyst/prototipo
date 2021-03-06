(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarSucursal', controladorRegistrarSucursal);

  controladorRegistrarSucursal.$inject = ['$stateParams', '$state', '$http', 'servicioSucursales'];

  function controladorRegistrarSucursal($stateParams, $state, $http, servicioSucursales) {
    let vm = this;

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then(function (success) {
      vm.provincias = success.data
    }, function (error) {
    });//provincias

    vm.rellenarCantones = (pidProvincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: './sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidProvincia == success.data[i].idProvincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones;
      }, (error) => {
      });
    }//cantones

    vm.rellenarDistrito = (pidCanton) => {
      vm.distritos = $http({
        method: 'GET',
        url: './sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCanton == success.data[i].idCanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos;
      }, (error) => {
      });
    }//distrito


    vm.SucursalNueva = {};
    vm.listaSucursales = servicioSucursales.retornarSucursal();

    listarSucursales();
    vm.registrarSucursal = (psucursalNueva) => {
      if(psucursalNueva.estadoSucursal==null){
        psucursalNueva.estadoSucursal = true;
      }
      let objNuevaSucursal = new Sucursal(psucursalNueva.codigoSucursal, psucursalNueva.nombreSucursal, psucursalNueva.provincia, psucursalNueva.canton, psucursalNueva.distrito, psucursalNueva.estadoSucursal);

      let codigoValidado = servicioSucursales.agregarSucursal(objNuevaSucursal);

      if (codigoValidado == true) {
        swal({
          title: "Registro exitoso",
          text: "Sucursal registrado correctamente",
          icon: "success",
          button: "Aceptar"
        });
      } else {
        swal({
          title: "Registro fallido",
          text: "La sucursal que intenta registrar ha sido ingresada anteriormente correspondiente al código de sucursal: "+psucursalNueva.codigoSucursal,
          icon: "error",
          button: "Aceptar"
        });
      }//fin else

      vm.SucursalNueva = null;
      listarSucursales();

    }// fin vm.registrarSucursal

    vm.listarSucursales = () => {
      $state.go('main.listarSucursales')
  }
  
  function listarSucursales() {
    vm.listaSucursales = servicioSucursales.retornarSucursal();
  }// fin listar Sucursales



  }// fin de la función controladorRegistrarSucursal
})();