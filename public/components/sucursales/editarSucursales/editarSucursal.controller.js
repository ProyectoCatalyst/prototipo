(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorEditarSucursal', controladorEditarSucursal);

  controladorEditarSucursal.$inject = ['$stateParams', '$state', '$http', 'servicioSucursales'];

  function controladorEditarSucursal($stateParams, $state, $http, servicioSucursales) {
    let vm = this;

    if (!$stateParams.objSucursal) {
      $state.go('main.listarSucursales');
    }

    let objSucursalSinFormato = JSON.parse($stateParams.objSucursal);

    let objSucursalTemp = new Sucursal(objSucursalSinFormato.codigoSucursal, objSucursalSinFormato.nombreSucursal, objSucursalSinFormato.provincia, objSucursalSinFormato.canton, objSucursalSinFormato.distrito);

    vm.sucursalActiva = objSucursalTemp.nombreSucursal;

    vm.SucursalMod = {};

    vm.SucursalMod.codigoSucursal = objSucursalTemp.codigoSucursal;
    vm.SucursalMod.nombreSucursal = objSucursalTemp.nombreSucursal;
    
    vm.SucursalMod.provinciaTexto = objSucursalTemp.provincia.name;
    vm.SucursalMod.cantonTexto = objSucursalTemp.canton.name;
    vm.SucursalMod.distritoTexto = objSucursalTemp.distrito.name;

    




    vm.listaSucursales = listarSucursales();

    listarSucursales();

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then(function (success) {
      vm.provincias = success.data
    }, function (error) {
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


    vm.editarSucursal = (psucursalEditar) => {
      if(psucursalEditar.estadoSucursal==null){
        psucursalEditar.estadoSucursal = true;
      }

      let objSucursalFormato = new Sucursal(psucursalEditar.codigoSucursal, psucursalEditar.nombreSucursal, psucursalEditar.provincia, psucursalEditar.canton, psucursalEditar.distrito,psucursalEditar.estadoSucursal);

      let updateValido = servicioSucursales.editarSucursal(objSucursalFormato);

      if (updateValido == true) {
        swal({
          title: "Actualización exitosa",
          text: "Sucursal actualizada correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('main.listarSucursales');
      }
      vm.SucursalNueva = null;
      listarSucursales();
    }

    vm.eliminarSucursal = (psucursalEliminar) => {
      swal({
        title: "¿Seguro que desesa eliminar la sucursal?",
        text: "Una vez eliminada, no será capaz de recuperar la sucursal seleccionada",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          let objSucursalFormato = new Sucursal(psucursalEliminar.codigoSucursal, psucursalEliminar.nombreSucursal);

          let deleteValido = servicioSucursales.eliminarSucursal(objSucursalFormato);
    
          if (deleteValido == true) {
            swal({
              title: "Eliminado",
              text: "Sucursal "+psucursalEliminar.codigoSucursal+" eliminada correctamente",
              icon: "success",
              button: "Aceptar"
            });
    
            $state.go('main.listarSucursales');
          }
          vm.SucursalNueva = null;
          listarSucursales();
        }
      });
    }//eliminar sucursal

    function listarSucursales() {
      vm.listaSucursales = servicioSucursales.retornarSucursal();
    }

    vm.regresar = () => {
      $state.go('main.listarSucursales');
    }
  }
})();