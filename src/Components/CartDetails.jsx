import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCart from "./ProductCard";
import { SfButton } from "@storefront-ui/react";
import { Link } from "react-router-dom";

const CartDetails = () => {
  const cartItems = useSelector((state) => state.cart.value);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const processCartProducts = async () => {
      const productPromises = cartItems.map(async (item) => {
        const response = await fetch(
          `https://dummyjson.com/products/${item.product}`
        );
        const data = await response.json();
        return data;
      });

      const resolvedProducts = await Promise.all(productPromises);
      resolvedProducts.map((resolvedProduct) => {
        for (let i of cartItems) {
          if (i.product === resolvedProduct.id) {
            resolvedProduct.cartQuantity = i.quantity;
            break;
          } else {
            resolvedProduct.cartQuantity = 0;
          }
        }
      });
      setProducts(resolvedProducts);
    };

    processCartProducts();
  }, [cartItems]);

  return (
    <>
      <div style={{ margin: "10px" }}>
        <h1
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          Your Cart Items
        </h1>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {products.map((product) => (
            <ProductCart
              key={product.id}
              product={product}
              cartProducts={cartItems}
            />
          ))}
          <br />
        </div>
        <div style={{ textAlign: "center" }}>
          <Link to="#" passHref legacyBehavior>
            <SfButton size="lg" as="a">
              Continue
            </SfButton>
          </Link>
        </div>
        <br />
      </div>
    </>
  );
};

export default CartDetails;
