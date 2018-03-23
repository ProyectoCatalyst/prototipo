(() => {
    'use strict';

    angular
        .module('prototipo')
        .controller('controladorlistaSucursales', controladorlistaSucursales)

    controladorlistaSucursales.$inject = ['$state', '$stateParams', 'servicioSucursales']
    function controladorlistaSucursales($state, $stateParams, servicioSucursales) {
        let vm = this;

        let codigoSeleccionado; // ejemplo

        vm.listarSucursalesAct = servicioSucursales.retornarSucursalesAct();
        vm.listarSucursalesDesact = servicioSucursales.retornarSucursalesDesact();

        vm.editarSucursales = (psucursales) => {
            let sucursalesLS = servicioSucursales.retornarSucursal();

            psucursales.estadoSucursal = true;
            $state.go('main.editarSucursales', { objSucursalMod: JSON.stringify(psucursales) });
        }

        vm.desactivarSucursal = (psucursales) => {
            let objSucursal = new Sucursal(psucursales.codigoSucursal, psucursales.nombreSucursal, psucursales.provincia, psucursales.canton, psucursales.distrito, psucursales.estadoSucursal);

            servicioSucursales.cambiarEstado(objSucursal);

            $state.reload();
        }//fin desactivar sucursal

        vm.activarSucursal = (psucursales) => {
            let objSucursal = new Sucursal(psucursales.codigoSucursal, psucursales.nombreSucursal, psucursales.provincia, psucursales.canton, psucursales.distrito, psucursales.estadoSucursal);

            servicioSucursales.cambiarEstado(objSucursal);

            $state.reload();
        }// fin acticar sucursal


        vm.editarSucursales = (psucursal) => {
            $state.go('main.editarSucursal', { objSucursal: JSON.stringify(psucursal) });
          }// fin Editar sucursal

        vm.agregarSucursales = () => {
            $state.go('main.registroSucursales');
          }

        vm.retornarDatosSucursales = servicioSucursales.retornarNombreSucursalesLS();

        vm.buscarCodigos = (pcodigoSucursal) => {
            // repartidoresSucursal = servicioUsuarios.retonarRepartidoresSucursal(pcodigoSucursal); | aqui llamo a la funcion que me retorna los repartidores con la sucursal cuyo codigo recibo
            codigoSeleccionado = pcodigoSucursal // le vamos a igualar o reemplazar su valor con los repartidoresSucursal, para que codigo seleccionado en este caso sea el objeto con la misma sucursal

        }

        vm.listarRepartidores = () => {
            return codigoSeleccionado
        }

    }
})();