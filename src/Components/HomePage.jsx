import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ProductCard from "./ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.cart.searchTerm);

  const getProducts = async () => {
    await fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (searchTerm) {
          let filteredProducts = data.products.filter((product) => {
            return product.title
              .toUpperCase()
              .includes(searchTerm.toUpperCase());
          });
          setProducts(filteredProducts);
        } else {
          setProducts(data.products);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    getProducts();
    // console.log("inside array");
  }, [searchTerm]);

  const cartProducts = useSelector((state) => state.cart.value);
  // console.log("cartProducts ", cartProducts);

  products.map((product) => {
    if (cartProducts.length == 0) {
      product.cartQuantity = 0;
    }
    for (let cart of cartProducts) {
      if (cart.product === product.id) {
        product.cartQuantity = cart.quantity;
        break;
      } else {
        product.cartQuantity = 0;
      }
    }
  });
  return (
    <>
      <Outlet />
      {loading && (
        <p style={{ textAlign: "center", margin: "auto" }}>Please wait ...</p>
      )}
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          gap: "40px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              cartProducts={cartProducts}
            />
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
