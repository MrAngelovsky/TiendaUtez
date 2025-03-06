import { useState } from "react"
import { View, StyleSheet, Alert } from "react-native"
import { Card, Image, Input, Button, Icon } from "@rneui/base"
import { isEmpty } from "lodash"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function Login(props) {
  const { navigation } = props
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (isEmpty(email) || isEmpty(password)) {
      setError({
        email: isEmpty(email) ? "El correo es requerido" : "",
        password: isEmpty(password) ? "La contraseña es requerida" : "",
      })
    } else {
      setError({ email: "", password: "" })
      setLoading(true)

      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log("Usuario autenticado: ", user.email)
          setLoading(false)
          // Navegar a la pantalla de productos después de iniciar sesión
          navigation.reset({
            index: 0,
            routes: [{ name: "ProductsScreen" }],
          })
        })
        .catch((error) => {
          setLoading(false)
          let errorMessage = "Error al iniciar sesión"

          if (error.code === "auth/invalid-email") {
            errorMessage = "El correo electrónico no es válido"
          } else if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
            errorMessage = "Correo o contraseña incorrectos"
          }

          Alert.alert("Error", errorMessage)
        })
    }
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.cardContent}>
          <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }} style={styles.logo} />

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
                name={showPassword ? "eye-off-outline" : "eye-outline"}
              />
            }
          />
          <Button title="Iniciar sesión" onPress={handleLogin} containerStyle={styles.button} loading={loading} />
          <Button type="clear" title="Crear cuenta" onPress={() => navigation.navigate("CreateAccountScreen")} />
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  cardContent: {
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  input: {
    width: "90%",
  },
  button: {
    marginTop: 20,
    width: "90%",
  },
})

