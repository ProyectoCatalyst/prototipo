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
}


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


