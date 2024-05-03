import { SfButton } from "@storefront-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Finalize = () => {
  const cartItems = useSelector((state) => state.cart.value);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const processCartProducts = async () => {
      const productPromises = cartItems
        .filter((cart) => {
          return cart.save_for_later != 1;
        })
        .map(async (item) => {
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
      setProducts(resolvedProducts);
    };
    processCartProducts();
  }, [cartItems]);
  // console.log("products", products);
  let totalQty = 0;
  let totalAmount = 0;
  products.map((product) => {
    totalQty = totalQty + product.cartQuantity;
    totalAmount = totalAmount + product.price * product.cartQuantity;
  });
  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>
        Summary of your Order
      </h1>
      {loading && <p>Loading ...</p>}
      <table
        style={{
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Sr. No</th>
            <th style={{ border: "1px solid black" }}>Image</th>
            <th style={{ border: "1px solid black" }}>Name of the product</th>
            <th style={{ border: "1px solid black" }}>Quantity</th>
            <th style={{ border: "1px solid black" }}>Price</th>
            <th style={{ border: "1px solid black" }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", textAlign: "center" }}>
                {index + 1}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  margin: "50px",
                  textAlign: "center",
                }}
              >
                <img
                  src={product.thumbnail}
                  style={{ height: "70px" }}
                  alt={product.thumbnail}
                />
              </td>
              <td style={{ border: "1px solid black", textAlign: "center" }}>
                {product.title}
              </td>
              <td
                style={{
                  border: "1px solid black",
                  textAlign: "right",
                  padding: "5px",
                }}
              >
                {product.cartQuantity.toFixed(2)}
              </td>
              <td style={{ border: "1px solid black", textAlign: "right" }}>
                {product.price.toFixed(2)}
              </td>
              <td style={{ border: "1px solid black", textAlign: "right" }}>
                {(product.cartQuantity * product.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} style={{ border: "1px solid black" }}>
              Total
            </th>
            <th
              style={{
                border: "1px solid black",
                textAlign: "right",
                padding: "5px",
              }}
            >
              {totalQty}
            </th>
            <th style={{ border: "1px solid black" }}></th>
            <th
              style={{
                border: "1px solid black",
                textAlign: "right",
                padding: "5px",
              }}
            >
              {totalAmount.toFixed(2)}
            </th>
          </tr>
        </tfoot>
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="#" passHref legacyBehavior>
          <SfButton size="lg" as="a">
            Go To Payment Option
          </SfButton>
        </Link>
      </div>
    </>
  );
};

export default Finalize;
