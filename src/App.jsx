import { useEffect, useState } from "react";
import "./App.css";
import NavbarTop from "./Components/NavbarTop";
import ProductCard from "./Components/ProductCard";
import { useSelector } from "react-redux";

function App() {
  // const [count, setCount] = useState(0);
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
      <NavbarTop />
      {loading && (
        <p style={{ textAlign: "center", margin: "auto" }}>Please wait ...</p>
      )}
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          gap: "40px",
          margin: "30px",
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
          // return <p key={product.id}>{product.title}</p>;
        })}
      </div>
      {/* <div
        style={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          gap: "20px",
          margin: "20px",
        }}
      >
        <ProductCard />
      </div> */}
    </>
  );
}

export default App;
