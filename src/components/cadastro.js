import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


const botaoPressionado = () => {
		Alert.alert('Carregando');
	};

class CadastroUsuario extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
          <Text style={styles.titulo}>Cadastro Usuario</Text>

          <View>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Nome'/>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Email'/>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Senha'/>

             <View style={styles.centralizar}>
            <TouchableOpacity onPress={botaoPressionado} style={styles.botao}>
						<Text>Concluir</Text>
					  </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class CadastroBorracharia extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View  style={styles.tela}>
          <Text style={styles.titulo}>Cadastro Borracharia</Text>

          <View>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Nome'/>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='CNPJ'/>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Endereço'/>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Email'/>
            <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Senha'/>

            <View style={styles.centralizar}>
          <TouchableOpacity onPress={botaoPressionado} style={styles.botao}>
						<Text>Concluir</Text>
					</TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Cadastro Usuario') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;

    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Cadastro Borracharia') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
  }

  return <IconComponent name={iconName} size={30} color={tintColor} />;
};

export default createAppContainer(
  createBottomTabNavigator(
    {
     Usuario: { screen: CadastroUsuario},
     Borracharia: { screen: CadastroBorracharia},
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeBackgroundColor: '#E0FFFF' ,
        activeTintColor: '#2F4F4F',

        inativeBackgroundColor: '#fff',
        inactiveTintColor: 'gray',
      },
    }
  )
);

const styles = StyleSheet.create({
    container: {
			backgroundColor: '#3CB371',
			flex: 1,
			alignItems: 'center',
			flexDirection: 'center',
      justifyContent: 'space-between'
		},
		tela: {
		  flexDirection: 'center',
      justifyContent: 'space-between',
	    alignItems: 'center',
		},
    centralizar: {
      flexDirection: 'center',
      justifyContent: 'space-between',
	    alignItems: 'center',
    },
    titulo: {
		  marginTop: 70,
		  marginBottom: 30,
			color: '#fff',
			fontSize: 38,
			fontFamily: 'Arial',
			fontWeight: 'bold',
		},
    caixasTexto: {
		  width: 250,
			borderRadius: 10,
			backgroundColor: '#fff',
			padding: 8,
			marginBottom: 10
		},
    botao: {
		  alignItems: 'center',
		  width: 80,
			borderRadius: 8,
			backgroundColor: '#E0FFFF',
			padding: 12,
			marginTop: 25,
			marginBottom: 25
		},
});
