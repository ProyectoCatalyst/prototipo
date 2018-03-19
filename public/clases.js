class Repartidor{
  constructor(pcedula, pfoto, pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcorreo, ptelefono, ptelefonoAdicional, psucursal, pgenero, pnacimiento, pcontrasena, pestado, prazonDesact){
    this.cedula = pcedula;
    this.foto = pfoto;
    this.nombre = pnombre;
    this.segundoNombre = psegundoNombre;
    this.primerApellido = pprimerApellido;
    this.segundoApellido = psegundoApellido
    this.correo = pcorreo;
    this.telefono = ptelefono;
    this.telefonoAdicional = ptelefonoAdicional;
    this.sucursal = psucursal;
    this.genero = pgenero;
    this.nacimiento = pnacimiento;
    this.contrasena = pcontrasena;
    this.paqueteAsignado = [];
    this.licencia =[];
    this.estado = pestado;
    this.razonDesact = prazonDesact;
  }

  getLicencias(){
    return this.licencia
  }

  getCedula(){
    return this.cedula
  }

  setLicencia(pobjLicencia){
    this.licencia.push(pobjLicencia)
  }

}

class Licencia{
  constructor(pcodigo, pfechaVencimiento, ptipo, pestado){
    this.codigo = pcodigo;
    this.fechaVencimiento = pfechaVencimiento;
    this.tipo = ptipo;
    this.estado = pestado;
  }

  getCodigo(){
    return this.codigo
  }

  getEstado(){
    return this.estado
  }
  
}

class Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol){
    this.primerNombre = pnombre;
    this.segundoNombre = psegundoNombre;
    this.primerApellido = pprimerApellido;
    this.segundoApellido = psegundoApellido;
    this.cedula = pcedula;
    this.fecha = pfecha;
    this.genero = pgenero;
    this.ubicacion = pubicacion;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    this.direccion = pdireccion;
    this.correo = pcorreo;
    this.contrasenna = pcontrasenna;
    this.rol = prol;
  }

  getCedula(){
     return this.cedula;
  }
  getCorreo(){
    return this.correo;
  }

  getRol(){
    return this.rol;
  }
  
}

/*
class EncargadoAduanas extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol)
  }
}

class EncargadoSucursal extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol)
  }
}

*/

class Cliente extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, ptelefono) {

    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol);
    
    this.telefono = ptelefono;
    //this.tarjeta = ptarjeta;
 }
}

