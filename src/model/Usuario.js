/* eslint-disable prettier/prettier */
class Usuario{
    constructor(nome,email,userType){
        this.nome = nome;
        this.email = email;
        this.userType = userType;
    }
    getNome = () => this.nome;
    getEmail = () => this.email;
    getUserType = () => this.userType;
}
export default Usuario;