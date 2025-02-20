import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Image, Input, Button, Icon } from '@rneui/base';
import { isEmpty } from 'lodash';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateAccount = () => {
    if (isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
      setError({
        email: "El correo es requerido",
        password: "La contraseña es requerida",
        confirmPassword: "La contraseña es requerida",
      });
    } else if (password !== confirmPassword) {
      setError({
        email: "",
        password: "Contraseña diferente",
        confirmPassword: "Las contraseñas no coinciden",
      });
    } else {
      setError({ email: "", password: "", confirmPassword: "" });
    }
    console.log("Usuario creado: ", email, password, confirmPassword); 
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardContent}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
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
          <Input
            placeholder="Repetir contraseña"
            label="Repetir contraseña"
            secureTextEntry={!showPassword}
            onChange={({ nativeEvent: { text } }) => setConfirmPassword(text)}
            errorMessage={error.confirmPassword}
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
            title="Crear cuenta"
            onPress={handleCreateAccount}
            containerStyle={styles.button}
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
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    cardContent: {
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    input: {
      width: '90%',
    },
    button: {
      marginTop: 20,
      width: '90%',
    },
  });
