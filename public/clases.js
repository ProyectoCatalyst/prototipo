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