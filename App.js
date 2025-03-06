import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { View, ActivityIndicator } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import Login from "./src/modules/auth/screens/Login"
import CreateAccount from "./src/modules/auth/screens/CreateAccount"
import "./src/config/utils/firebaseConnection"
import ProductDetail from "./src/modules/product/screens/ProductDetail"
import Products from "./src/modules/product/screens/Product"

const Stack = createNativeStackNavigator()

export default function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    })
    return unsubscribe
  }, [initializing])

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user ? "ProductsScreen" : "LoginScreen"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={Login} options={{ title: "Iniciar Sesión" }} />
          <Stack.Screen name="CreateAccountScreen" component={CreateAccount} options={{ title: "Crear Cuenta" }} />
          <Stack.Screen name="ProductsScreen" component={Products} options={{ title: "Productos" }} />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetail}
            options={{ title: "Detalle del Producto" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

