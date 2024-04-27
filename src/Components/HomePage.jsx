import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import ProductCart from "./ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getProducts = async () => {
    await fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.products);
        setProducts(data.products);
        setLoading(false);
      });
  };
  useEffect(() => {
    getProducts();
    // console.log("inside array");
  }, []);

  const cartProducts = useSelector((state) => state.cart.value);
  console.log("cartProducts ", cartProducts);

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
            <ProductCart
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
