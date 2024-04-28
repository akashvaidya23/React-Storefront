import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetch(`https://dummyjson.com/products/${productId}`);
      return data.json();
    };

    getProduct().then((data) => {
      //   console.log(data);
      setProduct(data);
      // return data;
    });
  }, [productId]);

  console.log(product);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <img
          style={{ width: "500px", height: "200px" }}
          src={product.thumbnail}
          alt=""
        />
        <br />
        <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
          {product.title}
        </h1>
        <span>{product.description}</span>
      </div>
    </>
  );
};

export default ViewProduct;
