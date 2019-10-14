/* eslint-disable prettier/prettier */
class Usuario{
    constructor(nome,email){
        this.nome = nome;
        this.email = email;
    }
    getNome = () => this.nome;
    getEmail = () => this.email;
}
export default Usuario;
