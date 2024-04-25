import { useEffect, useState } from "react";
import "./App.css";
import NavbarTop from "./Components/NavbarTop";
import ProductCard from "./Components/ProductCard";
import { useSelector } from "react-redux";

function App() {
  // const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    await fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.products);
        setProducts(data.products);
      });
  };
  useEffect(() => {
    getProducts();
    // console.log("inside array");
  }, []);

  const cartProducts = useSelector((state) => state.cart.value);
  // console.log("cartProducts ", cartProducts);

  products.map((product) => {
    for (let cart of cartProducts) {
      // console.log(cart.product + "===" + product.id);
      if (cart.product === product.id) {
        product.cartQuantity = cart.quantity;
        break;
      } else {
        product.cartQuantity = 0;
      }
    }
  });

  // console.log(products);

  return (
    <>
      <NavbarTop />
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          gap: "20px",
          margin: "20px",
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
