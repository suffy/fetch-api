// step 1. fetch the api, check the data in the console
// step 2. use the data to update the state and use flatlist to render the data
// step 3. handle the errors and error state
// step 4. add a loading indicator for a better user experience

import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const ProductListingScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const URL = "https://fakestoreapi.com/products";

    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json(); // convert it into readable format / parsed
      })
      .then((data) => {
        // console.log(data);
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator color="red" size="large" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image source={{ uri: item.image }} style={styles.images} />
              <Text style={{ fontSize: 18, textAlign: "center" }}>
                {item.price}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ProductListingScreen;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
  },
  images: {
    height: 200,
    width: 200,
  },
  errorStyle: {
    color: "red",
    fontSize: 18,
  },
});
