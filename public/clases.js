class Paquete{
  constructor(ptrackingPaquete, ptipoPaquete, pestadoPaquete, pcostoTotalPaquete){
    this.trackingPaquete = ptrackingPaquete;
    this.tipoPaquete = ptipoPaquete;
    this.costoTotalPaquete = pcostoTotalPaquete;
    this.estadoPaquete = pestadoPaquete;
    
  }//fin contructor

  capturarTrackingPaquete(){
    return this.trackingPaquete;
  }
  capturarTipoPaquete(){
    return this.tipoPaquete;
  }
  capturarEstadoPaquete(){
    return this.tipoPaquete;
  }
  capturarCostoTotalPaquete(){
    return this.costoTotalPaquete;
  }
}//fin class paquete

class Sucursal{
  constructor(pcodigoSucursal, pnombreSucursal, pprovincia, pcanton, pdistrito, pestadoSucursal){
    this.codigoSucursal = pcodigoSucursal;
    this.nombreSucursal = pnombreSucursal;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    //this.encargadoSucursal = pencargadoSucursal;
    //this.repartidoresSucursal = [];
    this.estadoSucursal = pestadoSucursal;

  }//fin constructor clase sucursal



  capturarNombreSucursal(){
    return this.nombreSucursal;
  }
  capturarCodigoSucursal(){
    return this.codigoSucursal;
  }

  retornarRepartidoresSucursal(){
    return this.repartidoresSucursal;
  }

  retornarEstadoSucursal(){
    return this.estadoSucursal;
  }
}//fin clase sucursal

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

class EncargadoAduanas extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol) {
    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol)
  }
}

//class   extends Usuario {
  //constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol) {
    //super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol)
  //}
//}

class Cliente extends Usuario {
  constructor(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol, ptelefono) {

    super(pnombre, psegundoNombre, pprimerApellido, psegundoApellido, pcedula, pfecha, pgenero, pubicacion, pprovincia, pcanton, pdistrito, pdireccion, pcorreo, pcontrasenna, prol);
    
    this.telefono = ptelefono;
    //this.tarjeta = ptarjeta;
 }
}

