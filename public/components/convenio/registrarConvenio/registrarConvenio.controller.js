(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarConvenio', controladorRegistrarConvenio);

    controladorRegistrarConvenio.$inject = ['$stateParams','$state','$http','servicioConvenio'];

    function controladorRegistrarConvenio($stateParams, $state, $http, servicioConvenio) {
      let vm = this;
      
      vm.ConvenioNuevo = {};
      vm.listaConvenio = listarConvenios();

      vm.registrarConvenio = (pconvenioNuevo) => {
        console.log(pconvenioNuevo);

        let objNuevoConvenio = new Convenio (pconvenioNuevo.codigo, pconvenioNuevo.nombre,
        pconvenioNuevo.descripcion,
        pconvenioNuevo.institucion,
        pconvenioNuevo.costo,
        );
  
        console.log('objeto con convenio');
        console.log(objNuevoConvenio);
  
        servicioConvenio.agregarConvenios(objNuevoConvenio);
          swal({
            title: "Registro exitoso",
            text: "Convenio registrado correctamente",
            icon: "success",
            button: "Aceptar"
          });
        
        vm.ConvenioNuevo = null;
        listarConvenios();
        }

        function listarConvenios(){
          vm.listaConvenio = servicioConvenio.retornarConvenio(); 
        }


    }
})();