import { useEffect, useState } from "react";
import "./App.css";
import NavbarTop from "./Components/NavbarTop";
import ProductCard from "./Components/ProductCard";

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
    console.log("inside array");
  }, []);
  console.log(products);

  return (
    <>
      <NavbarTop />
      {/* {products.map((product) => {
        return <p key={product.id}>{product.title}</p>;
      })} */}
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          gap: "20px",
          margin: "20px",
        }}
      >
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
}

export default App;
