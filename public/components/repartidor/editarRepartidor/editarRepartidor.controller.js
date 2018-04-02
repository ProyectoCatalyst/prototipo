(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorEditarRepartidor', controladorEditarRepartidor)

  controladorEditarRepartidor.$inject = ['$state', '$stateParams', 'servicioUsuarios', 'servicioSucursales']

  function controladorEditarRepartidor($state, $stateParams, servicioUsuarios, servicioSucursales){
   
    let vm = this;

    if(!$stateParams.datosMod){
      $state.go('main')
    }
    let datosRepartidor = JSON.parse($stateParams.datosMod);

    vm.retornarDatosSucursales = servicioSucursales.retornarNombreSucursalesLS();

    vm.datosMod = {};
    vm.datosMod.nombre = datosRepartidor.primerNombre;
    vm.datosMod.primerApellido = datosRepartidor.primerApellido;
    vm.datosMod.cedula = datosRepartidor.cedula;
    vm.datosMod.correo = datosRepartidor.correo;
    vm.datosMod.fechaNacimiento = new Date(datosRepartidor.fecha);
    vm.datosMod.sucursal = datosRepartidor.sucursal;
    vm.datosMod.segundoNombre = datosRepartidor.segundoNombre;
    vm.datosMod.segundoApellido = datosRepartidor.segundoApellido;
    vm.datosMod.telefono = datosRepartidor.telefono;
    vm.datosMod.telefonoAdicional = datosRepartidor.telefonoAdicional;
    vm.datosMod.genero = datosRepartidor.genero;
    vm.datosMod.foto = datosRepartidor.foto;

    vm.editarPerfil = (pdatosMod) => {
      pdatosMod.rol = 4;
      pdatosMod.estado = datosRepartidor.estado,
      pdatosMod.razonDesact = datosRepartidor.razonDesact;
      pdatosMod.licencia = datosRepartidor.licencia;
      pdatosMod.paqueteAsignado = datosRepartidor.paqueteAsignado;
      
      let edadCorrecta = verificarEdad(pdatosMod.fechaNacimiento);

      if(pdatosMod.contrasenna != pdatosMod.confirmarContrasenna){
        swal({
          title: 'Las contrasenas no coinciden',
          text: 'Verifique sus datos',
          icon: 'error',
          button: 'Aceptar'
        });
      }else{
        if(!edadCorrecta){
          swal({
            title: 'La edad es incorrecta',
            text: 'Debe ser mayor de edad',
            icon: 'error',
            button: 'Aceptar'
          });
        }else{
          let objEditarInfo = new Repartidor(pdatosMod.nombre, pdatosMod.segundoNombre, pdatosMod.primerApellido, pdatosMod.segundoApellido, pdatosMod.cedula, pdatosMod.fechaNacimiento, pdatosMod.genero, pdatosMod.ubicacion, pdatosMod.provincia, pdatosMod.canton, pdatosMod.distrito, pdatosMod.direccion,pdatosMod.correo, pdatosMod.contrasenna, pdatosMod.rol, pdatosMod.telefono, pdatosMod.telefonoAdicional, pdatosMod.estado, pdatosMod.razonDesact, pdatosMod.sucursal);

          for(let i=0; i<pdatosMod.licencia.length; i++){
            objEditarInfo.setLicencia(pdatosMod.licencia[i]);
          }

          servicioUsuarios.actualizarUsuario(objEditarInfo);

          swal({
            title: 'Listo',
            text: 'Informacion editada',
            icon: 'success',
            button: 'Aceptar'
          });
          $state.go('main');
        }
      }
    }

    function verificarEdad(pfechaNacimiento){
      let hoy = new Date,
          edad = (hoy-pfechaNacimiento) / 31536000000, // numero de un anio en milisegundos
          menor = false;
        
          if(edad < 18){
              menor = true
          }

          return !menor
    }
  }
})();