/* eslint-disable prettier/prettier */
import firebase from "react-native-firebase";

class Firebase{
  constructor(){
    this.auth = firebase.auth();
    this.refUsuarios = firebase.firestore().collection('usuarios');
    this.refDestinacoes = firebase.firestore().collection('destinacoes');
  }

  cadastrarUsuarioF = (usuario) => {
    this.refUsuarios.add({
      nome: usuario.nome,
      email: usuario.email,
      userType: "Comum",
    });
  }

  sugerirDestinacao = (destinacao) => 
    this.refDestinacoes.add({
      ecoponto: destinacao.ecoponto,
      cep: destinacao.cep,
      bairro: destinacao.bairro,
      endereco: destinacao.endereco,
      numero: destinacao.numero,
      estado: destinacao.estado,
      cidade: destinacao.cidade,
      telefone: destinacao.telefone,
      latitude: destinacao.latitude,
      longitude: destinacao.longitude,
      visivel: false,
    })

  recuperarDestinacao = (visibilidade, snapshot) => 
  this.refDestinacoes
    .where("visivel", "==", visibilidade)
    .onSnapshot(snapshot);
  
  autenticarUsuarioF = (email,password) => 
    this.auth.createUserWithEmailAndPassword(email,password)

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
