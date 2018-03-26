
(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarCliente', controladorRegistrarCliente);

    controladorRegistrarCliente.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios']; 

  function controladorRegistrarCliente($http, $stateParams, $state, servicioUsuarios) {
    let vm = this;

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
      }).then( (success) => {
        vm.provincias = success.data;
      }, (error) => {
    });

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
    }

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
    }

    vm.clienteNuevo = {};
    
    vm.registrarCliente= (pclienteNuevo) => {

      let rol = 5;
      
      let objNuevoCliente = new Cliente(pclienteNuevo.nombre, pclienteNuevo.segundoNombre, pclienteNuevo.primerApellido, pclienteNuevo.segundoApellido, pclienteNuevo.cedula, pclienteNuevo.fecha,  pclienteNuevo.sexo, pclienteNuevo.ubicacion, pclienteNuevo.provincia.name, pclienteNuevo.canton.name, pclienteNuevo.distrito.name, pclienteNuevo.direccion,  pclienteNuevo.correo, pclienteNuevo.contrasenna, rol, pclienteNuevo.telefono); 
      
      let registro = servicioUsuarios.agregarCliente(objNuevoCliente);

      if(registro == true){
        swal({
          title: "Registro exitoso",
          text: "Cliente registrado correctamente",
          icon: "success",
          button: "Aceptar"
        });
        vm.clienteNuevo = null;
        $state.go('iniciarSesión');
      }else{
        swal({
          title: "Ha ocurrido un Error",
          text: "No sea tonto, el cliente ya se encuentra registrado",
          icon: "error",
          button: "Aceptar"
        });
      }
    }
  }
})();