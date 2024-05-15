import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SfButton } from "@storefront-ui/react";
import { Link } from "react-router-dom";
import CartProducts from "./CartProducts";

const CartDetails = () => {
  const cartItems = useSelector((state) => state.cart.value);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(cartItems);
  useEffect(() => {
    const processCartProducts = async () => {
      const productPromises = cartItems.map(async (item) => {
        const response = await fetch(
          `https://dummyjson.com/products/${item.product}`
        );
        const data = await response.json();
        setLoading(false);
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

      cartItems.map((cartItem) => {
        // console.log(cartItem.save_for_later);
        resolvedProducts.forEach((res) => {
          if (res.id == cartItem.product || cartItem.save_for_later == 1) {
            res.save_for_later = 1;
          } else {
            res.save_for_later = 0;
          }
        });
      });
      console.log(resolvedProducts);
      setProducts(resolvedProducts);
    };
    processCartProducts();
  }, [cartItems]);

  let totalQty = 0;
  let totalAmount = 0;
  products.map((product) => {
    totalQty = totalQty + product.cartQuantity;
    totalAmount = totalAmount + product.price * product.cartQuantity;
  });
  return (
    <>
      <div style={{ margin: "10px" }}>
        <h1
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
        >
          Your Cart Items
        </h1>
        {cartItems.length > 0 && loading && (
          <p style={{ textAlign: "center", margin: "auto" }}>Please Wait ...</p>
        )}
        <br />
        {cartItems.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "40px",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {products.map((product) => {
              return <CartProducts key={product.id} product={product} />;
            })}
          </div>
        ) : (
          <p style={{ textAlign: "center", margin: "auto" }}>
            No Products added to cart
          </p>
        )}

        {!loading && (
          <div>
            <table
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "40px",
              }}
            >
              <tr>
                <th style={{ textAlign: "left" }}>Total Quantity :</th>
                <td style={{ textAlign: "right" }}>{totalQty.toFixed(2)}</td>
              </tr>
              <tr>
                <th style={{ textAlign: "left" }}>Total Price:</th>
                <td style={{ textAlign: "right" }}>{totalAmount.toFixed(2)}</td>
              </tr>
            </table>
          </div>
        )}
        {!loading && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/finalize" passHref legacyBehavior>
              <SfButton size="lg" as="a">
                Continue
              </SfButton>
            </Link>
          </div>
        )}
        <br />
      </div>
    </>
  );
};

export default CartDetails;
