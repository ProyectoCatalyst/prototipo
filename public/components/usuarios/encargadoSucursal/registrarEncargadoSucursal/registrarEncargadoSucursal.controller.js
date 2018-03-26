(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistroEncargadoSucursal', controladorRegistroEncargadoSucursal);

  controladorRegistroEncargadoSucursal.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios'];

  function controladorRegistroEncargadoSucursal($http, $stateParams, $state, servicioUsuarios) {
    let vm = this;


    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then((success) => {
      vm.provincias = success.data
    }, function (error) {
    });

    vm.rellenarCantones = (pidprovincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: './sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (success.data[i].idProvincia == pidprovincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones
      }, function (error) {
      });
    };


    vm.rellenarDistritos = (pidcanton) => {
      vm.distritos = $http({
        method: 'GET',
        url: './sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (success.data[i].idCanton == pidcanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos
      }, function (error) {
      });
    };

    vm.nuevoEncargadoSucursal = {};

    vm.registrarEncargadoSucursal = (pnuevoEncargadoSucursal) => {


      let rol = 3;

      let objEncargadoSucursalTem = new EncargadoSucursales (pnuevoEncargadoSucursal.nombre, pnuevoEncargadoSucursal.segundoNombre, pnuevoEncargadoSucursal.apellido, pnuevoEncargadoSucursal.segundoApellido, pnuevoEncargadoSucursal.cedula, pnuevoEncargadoSucursal.fecha, pnuevoEncargadoSucursal.genero, pnuevoEncargadoSucursal.ubicacion, pnuevoEncargadoSucursal.provincia.name, pnuevoEncargadoSucursal.canton.name, pnuevoEncargadoSucursal.distrito.name, pnuevoEncargadoSucursal.direccion,pnuevoEncargadoSucursal.correo, pnuevoEncargadoSucursal.contrasenna, rol);

      let registro = servicioUsuarios.agregarUsuario(objEncargadoSucursalTem);

      if (registro == true) {
        swal({
          title: "Registro exitoso",
          text: "Registrado correctamente.",
          icon: "success"
        });
      }
    }

  }
})();