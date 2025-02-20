import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Image, Input, Button, Icon } from '@rneui/base';
import { isEmpty } from 'lodash';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (isEmpty(email) || isEmpty(password)) {
      setError({
        email: 'El correo es requerido',
        password: 'La contraseña es requerida',
      });
      return;
    }

    setError({ email: '', password: '' });
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario logeado exitosamente:', userCredential.user);
      })
      .catch((err) => {
        console.log('Error al iniciar sesión:', err);
      });
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.pngz' }}
            style={styles.logo}
          />

          <Input
            placeholder="Correo electrónico"
            label="Correo electrónico"
            keyboardType="email-address"
            onChange={({ nativeEvent: { text } }) => setEmail(text)}
            errorMessage={error.email}
            containerStyle={styles.input}
          />
          <Input
            placeholder="Contraseña"
            label="Contraseña"
            secureTextEntry={!showPassword}
            onChange={({ nativeEvent: { text } }) => setPassword(text)}
            errorMessage={error.password}
            containerStyle={styles.input}
            rightIcon={
              <Icon
                onPress={() => setShowPassword(!showPassword)}
                type="material-community"
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              />
            }
          />

          <Button
            title="Iniciar sesión"
            onPress={handleLogin}
            containerStyle={styles.button}
          />
          <Button
            type="clear"
            title="Crear cuenta"
            onPress={() => navigation.navigate('CreateAccountScreen')}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 10,
    paddingVertical: 30, // Aumenta el padding vertical
    paddingHorizontal: 20, // Espaciado horizontal interno
  },
  cardContent: {
    alignItems: 'center', // Centra todo el contenido
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  input: {
    width: '90%', // Ajusta el ancho de los inputs
  },
  button: {
    marginTop: 20,
    width: '90%', // Ajusta el ancho del botón
  },
});

