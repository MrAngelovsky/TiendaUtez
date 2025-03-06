import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { Card, Image, Button, Icon } from "@rneui/base"
import { getAuth, signOut } from "firebase/auth"
import { getFirestore, collection, getDocs } from "firebase/firestore"

export default function Products({ navigation }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const db = getFirestore()
      const productsCollection = collection(db, "products")
      const productsSnapshot = await getDocs(productsCollection)

      if (productsSnapshot.empty) {
        // Si no hay productos, mostrar mensaje y crear algunos productos de ejemplo
        console.log("No hay productos en Firestore. Debes agregar algunos productos.")
        Alert.alert(
          "Sin productos",
          "No hay productos disponibles en la base de datos. ¿Deseas agregar algunos productos de ejemplo?",
          [
            {
              text: "No",
              style: "cancel",
              onPress: () => setLoading(false),
            },
            {
              text: "Sí",
              onPress: () => {
                // Aquí podrías implementar una función para agregar productos de ejemplo
                // Por ahora, solo mostramos un mensaje
                Alert.alert("Información", "Para agregar productos, debes hacerlo desde el panel de Firebase.")
                setLoading(false)
              },
            },
          ],
        )
      } else {
        // Mapear los documentos a un formato utilizable
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        console.log("Productos obtenidos:", productsList.length)
        setProducts(productsList)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error al obtener productos:", error)
      Alert.alert("Error", "No se pudieron cargar los productos. " + error.message)
      setLoading(false)
    }
  }

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        })
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error)
      })
  }

  const handleViewProductDetails = (product) => {
    navigation.navigate("ProductDetailScreen", { product })
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => handleViewProductDetails(item)}>
      <Card containerStyle={styles.card}>
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/150" }}
          style={styles.productImage}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.productName}>{item.name || "Producto sin nombre"}</Text>
        <Text style={styles.productPrice}>${typeof item.price === "number" ? item.price.toFixed(2) : "0.00"}</Text>
        <Button
          title="Ver detalles"
          buttonStyle={styles.detailButton}
          titleStyle={styles.detailButtonText}
          onPress={() => handleViewProductDetails(item)}
        />
      </Card>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" type="material" color="#FF6B6B" size={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="shopping-bag" type="feather" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No hay productos disponibles</Text>
          <Button title="Recargar" onPress={fetchProducts} buttonStyle={styles.reloadButton} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  reloadButton: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 30,
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    maxWidth: "50%",
  },
  card: {
    borderRadius: 10,
    padding: 10,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 5,
    paddingVertical: 8,
  },
  detailButtonText: {
    fontSize: 12,
  },
})

