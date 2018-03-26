(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarConvenio', controladorRegistrarConvenio);

  controladorRegistrarConvenio.$inject = ['$stateParams', '$state', '$http', 'servicioConvenio'];

  function controladorRegistrarConvenio($stateParams, $state, $http, servicioConvenio) {
    let vm = this;

    vm.ConvenioNuevo = {};
    vm.listaConvenio = servicioConvenio.retornarConvenio();

    vm.registrarConvenio = (pconvenioNuevo) => {
      console.log(pconvenioNuevo);

      let objNuevoConvenio = new Convenio(pconvenioNuevo.codigoConvenio, pconvenioNuevo.nombreConvenio,
        pconvenioNuevo.descripcionConvenio,
        pconvenioNuevo.institucionConvenio,
        pconvenioNuevo.costoConvenio
      );

      console.log('objeto con convenio');
      console.log(objNuevoConvenio);

      servicioConvenio.agregarConvenio(objNuevoConvenio);

      swal({
        title: "Convenio registrado",
        text: "El convenio se ha registrado exitosamente",
        icon: "success",
        button: "Aceptar"
      });
      $state.reload();
    }

    vm.listarConvenios = () => {
      servicioConvenio.retornarConvenio();

      function listarConvenios(){
        vm.listaConvenio = servicioConvenio.retornarConvenio();
      }

      // let str = "<table>";
      //   str += "<tr><th>Codigo</th><th>Nombre</th><th>Descripcion</th><th>Institucion</th><th>Costo</th>";

      // for (var i = 0; i < vm.listaConvenio.length; i++) {
      //   str += "<tr>";
      //   str += "<td>"+vm.listaConvenio[i].codigoConvenio + "</td>";
      //   str += "<td>"+vm.listaConvenio[i].nombreConvenio + "</td>";
      //   str += "<td>"+vm.listaConvenio[i].descripcionConvenio + "</td>";
      //   str += "<td>"+vm.listaConvenio[i].institucionConvenio + "</td>";
      //   str += "<td>"+vm.listaConvenio[i].costoConvenio + "</td>";
      //   str += "</tr>";
      // }
      //   str += "</table>";


      //   document.querySelector('#mostrarConvenios').innerHTML = str;
    }

  }
})();