import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { Image, Button, Icon, Divider } from "@rneui/base"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ProductDetail({ route, navigation }) {
  // Obtener el producto de los parámetros de navegación
  const { product } = route.params

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text>Cargando producto...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" type="material" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del Producto</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image || "https://via.placeholder.com/500" }}
            style={styles.productImage}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

          <View style={styles.stockContainer}>
            <Icon name="inventory" type="material" size={18} color="#4A90E2" />
            <Text style={styles.stockText}>Disponibles: {product.stock || "Consultar disponibilidad"}</Text>
          </View>

          <Divider style={styles.divider} />

          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          {product.category && (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Categoría:</Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{product.category}</Text>
              </View>
            </View>
          )}

          <View style={styles.actionButtons}>
            <Button
              title="Agregar al Carrito"
              icon={<Icon name="shopping-cart" type="material" color="white" size={20} style={{ marginRight: 10 }} />}
              buttonStyle={styles.addToCartButton}
              titleStyle={styles.buttonText}
            />
            <Button title="Comprar Ahora" buttonStyle={styles.buyNowButton} titleStyle={styles.buttonText} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    paddingVertical: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 12,
  },
  stockContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stockText: {
    marginLeft: 8,
    color: "#4A90E2",
    fontSize: 14,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  categoryLabel: {
    fontSize: 16,
    color: "#333",
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: "#E8F4FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: "#4A90E2",
    fontWeight: "500",
  },
  actionButtons: {
    marginTop: 8,
    gap: 12,
  },
  addToCartButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buyNowButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

