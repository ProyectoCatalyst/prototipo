(()=>{
'use strict';
angular
.module('prototipo')
.controller('controladorRegistroEncargadoAduana', controladorRegistroEncargadoAduana);
    
controladorRegistroEncargadoAduana.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios'];
  
    function controladorRegistroEncargadoAduana ($http, $stateParams, $state, servicioUsuarios){
      let vm = this;

      vm.provincias = $http({
        method: 'GET',
        url: './sources/data/provincias.json'
      }).then((success) => {
        vm.provincias = success.data
      }, function (error) {
        console.log("Ocurrió un error" + error);
      });

      vm.rellenarCantones = (pidprovincia) => {
        vm.cantones = $http({
          method: 'GET',
          url: './sources/data/cantones.json'
        }).then((success) => {
          let cantones = [];
          for (let i = 0; i < success.data.length; i++) {
            if(success.data[i].idProvincia == pidprovincia){
              cantones.push(success.data[i]);
            }
          }
          vm.cantones = cantones
        }, function (error) {
          console.log("Ocurrió un error" + error);
        });
      };

      
      vm.rellenarDistritos = (pidcanton) => {
        vm.distritos = $http({
          method: 'GET',
          url: './sources/data/distritos.json'
        }).then((success) => {
          let distritos = [];
          for (let i = 0; i < success.data.length; i++) {
            if(success.data[i].idCanton == pidcanton){
              distritos.push(success.data[i]);
            }
          }
          vm.distritos = distritos
        }, function (error) {
          console.log("Ocurrió un error" + error);
        });
      };
      
      vm.nuevoEncargadoAduana = {};
      
      vm.registrarEncargadoAduana = (pnuevoEncargadoAduana)=>{

        let rol = 2;
        let estadoDesactivado = false;
  
        let objEncargadoAduanaTem = new EncargadoAduanas (pnuevoEncargadoAduana.nombre, pnuevoEncargadoAduana.segundoNombre, pnuevoEncargadoAduana.apellido, pnuevoEncargadoAduana.segundoApellido, pnuevoEncargadoAduana.cedula, pnuevoEncargadoAduana.fecha, pnuevoEncargadoAduana.genero, pnuevoEncargadoAduana.ubicacion, pnuevoEncargadoAduana.provincia.name, pnuevoEncargadoAduana.canton.name, pnuevoEncargadoAduana.distrito.name, pnuevoEncargadoAduana.direccion,pnuevoEncargadoAduana.correo, pnuevoEncargadoAduana.contrasenna, rol, estadoDesactivado);
   
        console.log(objEncargadoAduanaTem); 
      
        let registro = servicioUsuarios.agregarUsuario(objEncargadoAduanaTem);
  
        if (registro == true) {
          swal({
            title: "Registro exitoso",
            text: "Registrado correctamente.",
            icon: "success",
            button: "Aceptar"
          }); 
          vm.nuevoEncargadoAduana = null;
        }
      }
  
      }
})();
