/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import firebase from "react-native-firebase";

let auth = firebase.auth();
let ref = firebase.firestore().collection('usuarios');

export function cadastrarNoBanco(nome, email) {
  ref.add({
    nome,
    email,
    userType: 'Comum',
  });
}

export const autenticarUsuario = (email, password, nome, reactComponentContext) => {
  if (email === '' || password === '' || nome === '') {
    alert('Por favor, preencha os campos');
  } else {
    //Criar Autenticação por Email
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        try {
          alert('Cadastro efetuado com sucesso!');
          reactComponentContext.props.navigation.navigate('Login');
          //Adicionar ao banco
          ref.add({
            nome,
            email,
            userType: 'Comum',
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Esse email já está cadastrado');
            break;
          case 'auth/invalid-email':
            alert('Esse email é invalido');
            break;
          case 'auth/weak-password':
            alert('A senha deve ter no minimo 6 caracteres');
            break;
          default:
            alert('Erro ao realizar cadastro');
        }
      });
  }
}
export function logarUsuario(email, password, reactComponentContext) {
  if (email === '' || password === '') {
    alert('Por favor, preencha os campos');
  } else {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => { reactComponentContext.props.navigation.navigate('Principal'); })
      .catch(error => {
        switch (error.code) {
          case 'auth/wrong-password':
            alert('Senha incorreta');
            break;
          case 'auth/invalid-email':
            alert('Esse email é invalido');
            break;
          case 'auth/user-not-found':
            alert('Usuario não encontrado');
            break;
          default:
            alert('Erro ao realizar login');
        }
      });
  }
}

export function verificarAutenticacao(reactComponentContext) {
  auth.onAuthStateChanged(user => {
    if (user) {
      reactComponentContext.props.navigation.navigate('Principal');
      return true;
    } else {
      reactComponentContext.props.navigation.navigate('Login');
    }
  }
  );
}
