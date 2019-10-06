/* eslint-disable prettier/prettier */
import firebase from "react-native-firebase";

class Firebase{
  constructor(){
    this.auth = firebase.auth();
    this.refUsuarios = firebase.firestore().collection('usuarios');
    this.refDestinacoes = firebase.firestore().collection('destinacoes');
  }

  cadastrarUsuarioF = (nome, email) => {
    this.refUsuarios.add({
      nome,
      email,
    });
  }

  sugerirDestinacao = (ecoponto, telefone, endereco, numero, bairro, cep, cidade, estado, latitude, longitude) => 
    this.refDestinacoes.add({
      ecoponto,
      telefone,
      endereco,
      numero,
      bairro,
      cep,
      cidade,
      estado,
      latitude,
      longitude,
      visivel: false,
    })
  
  autenticarUsuarioF = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password)

  logarUsuarioF = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);
  
  verificarAutenticacao = (context) => {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        context.props.navigation.navigate('Principal');
      } else {
        context.props.navigation.navigate('Login');
      }
    }
    );
  }

  logout(){
    this.auth.signOut();
  }

  enviarRedefinicaoSenha = (email) =>
    this.auth.sendPasswordResetEmail(email);
}
export default Firebase;
