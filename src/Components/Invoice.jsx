import { useLocation } from "react-router-dom";

const Invoice = () => {
  const { state } = useLocation();
  console.log(state);
  //   const { id, color } = state;
  //   const [products, setProducts] = useState([]);
  const products = [...state];
  let totalQty = 0;
  let totalAmount = 0;
  products.map((product) => {
    totalQty = totalQty + product.cartQuantity;
    totalAmount = totalAmount + product.price * product.cartQuantity;
  });

  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>
        Your Invoice
      </h1>
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
            <th style={{ border: "1px solid black" }}>Product</th>
            <th style={{ border: "1px solid black" }}>Quantity</th>
            <th style={{ border: "1px solid black" }}>Price</th>
            <th style={{ border: "1px solid black" }}>Subtotal</th>
          </tr>
        </thead>
        {products.map((product, index) => {
          return (
            <tr key={index}>
              <td style={{ border: "1px solid black", textAlign: "center" }}>
                {index + 1}
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
          );
        })}
        <tfoot>
          <tr>
            <th colSpan={2} style={{ border: "1px solid black" }}>
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
      <br />
      <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
        Thank you for shopping with us.
      </h1>
    </>
  );
};

export default Invoice;
