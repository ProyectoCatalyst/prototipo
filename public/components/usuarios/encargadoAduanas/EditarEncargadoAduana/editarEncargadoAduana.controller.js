(()=>{
  'use strict';
  angular
  .module('prototipo')
  .controller('controladorEditarEncargadoAduana', controladorEditarEncargadoAduana);
      
  controladorEditarEncargadoAduana.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios'];
    
      function controladorEditarEncargadoAduana ($http, $stateParams, $state, servicioUsuarios){
        let vm = this;

        if(stateParams.correo == '') {
          $state.go ('listarTodosUsuarios');
        }

        let  encargadoAduanaModificar = servicioUsuarios.obtenerUsuarioSelecionado(stateParams.correo);

        vm.encargadoAduanaModificado = {
          nombre : encargadoAduanaModificar.nombre,
          segundoNombre : encargadoAduanaModificar.segundoNombre,
          apellido : encargadoAduanaModificar.apellido,
          segundoApellido : encargadoAduanaModificar.segundoApellido,
          cedula : encargadoAduanaModificar.cedula,
          fecha : encargadoAduanaModificar.fecha,
          fecha : encargadoAduanaModificar.genero,
          fecha : encargadoAduanaModificar.ubicacion,
          fecha : encargadoAduanaModificar.provincia.name,
          fecha : encargadoAduanaModificar.canton.name,
          fecha : encargadoAduanaModificar.distrito.name,
          fecha : encargadoAduanaModificar.direccion,
       // fecha : encargadoAduanaModificar.correo,
          fecha : encargadoAduanaModificar.contrasenna
      }



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
              if(success.data[i].idProvincia == pidprovincia){
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
              if(success.data[i].idCanton == pidcanton){
                distritos.push(success.data[i]);
              }
            }
            vm.distritos = distritos
          }, function (error) {
          });
        };
        
         vm.modificarEncargadoAduana = (pnuevoEncargadoAduana)=>{
  
         let rol = 2;
    
         let objEncargadoAduanaTem = new EncargadoAduanas (pnuevoEncargadoAduana.nombre, pnuevoEncargadoAduana.segundoNombre, pnuevoEncargadoAduana.apellido, pnuevoEncargadoAduana.segundoApellido, pnuevoEncargadoAduana.cedula, pnuevoEncargadoAduana.fecha, pnuevoEncargadoAduana.genero, pnuevoEncargadoAduana.ubicacion, pnuevoEncargadoAduana.provincia.name, pnuevoEncargadoAduana.canton.name, pnuevoEncargadoAduana.distrito.name, pnuevoEncargadoAduana.direccion,pnuevoEncargadoAduana.correo, pnuevoEncargadoAduana.contrasenna, rol);
     
          console.log(objEncargadoAduanaTem); 
        
          let registro = servicioUsuarios.actualizarUsuario(objEncargadoAduanaTem);
    
          if (registro == true) {
            swal({
            title: "Cambio exitoso",
            text: "Cambio realizado correctamente.",
            icon: "success",
            button: "Aceptar"
            }); 
            vm.nuevoEncargadoAduana = null;
          }
         }
    
        }
  })();
  
