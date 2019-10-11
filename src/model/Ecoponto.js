/* eslint-disable prettier/prettier */
class Ecoponto{
    constructor(ecoponto, cep, endereco, bairro, numero, cidade, estado, telefone, latitude, longitude){
        this.ecoponto = ecoponto;
        this.cep = cep;
        this.endereco = endereco;
        this.bairro = bairro;
        this.numero = numero;
        this.cidade = cidade;
        this.estado = estado;
        this.telefone = telefone;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    getEcoponto = () => this.ecoponto;
    getCep = () => this.cep;
    getEndereco = () => this.endereco;
    getBairro = () => this.bairro;
    getNumero = () => this.numero;
    getCidade = () => this.cidade;
    getEstado = () => this.estado;
    getTelefone = () => this.telefone;
    getLatitude = () => this.latitude;
    getLongitude = () => this.longitude;
    
}
export default Ecoponto;