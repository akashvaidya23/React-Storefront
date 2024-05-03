import {
  SfButton,
  SfIconAdd,
  SfIconDelete,
  SfIconRemove,
} from "@storefront-ui/react";
import { useEffect, useId, useState } from "react";
import { useCounter } from "react-use";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clamp } from "@storefront-ui/shared";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

const ViewProduct = () => {
  let { productId } = useParams();
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();
  const inputId = useId();
  const min = 1;
  const max = 999;
  // console.log(product.product.cartQuantity);

  function handleOnChange(event) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    // console.log("nextValue ", nextValue);
    set(Number(clamp(nextValue, min, max)));
  }

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

  const cartProducts = useSelector((state) => state.cart.value);
  console.log("cartProducts ", product);
  const currentProduct = cartProducts.find((cart) => {
    // console.log(cart.product, productId);
    return cart.product == productId;
  });
  // console.log(currentProduct);
  const [value, { inc, dec, set }] = useCounter(
    (currentProduct && currentProduct.quantity) || min
  );

  const increment = (obj) => {
    inc();
    dispatch(addToCart(obj));
  };

  const decrement = (obj) => {
    dec();
    dispatch(addToCart(obj));
    // console.log(obj.quantity);
    if (obj.quantity === 0) {
      // setCartAdded(false);
    }
  };

  const deleteFromCart = (obj) => {
    dispatch(removeFromCart(obj));
    // setCartAdded(false);
    set(min);
  };

  // console.log(value);
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
      <div className="flex items-center justify-center">
        <div className="flex border border-neutral-300 rounded-md">
          <SfButton
            variant="tertiary"
            square
            className="rounded-r-none"
            aria-controls={inputId}
            disabled={value <= min}
            aria-label="Decrease value"
            onClick={() =>
              decrement({
                quantity: value - 1,
                product: product.id,
              })
            }
          >
            <SfIconRemove />
          </SfButton>
          <input
            id={inputId}
            type="number"
            role="spinbutton"
            className="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
            min={min}
            max={max}
            value={value}
            onChange={handleOnChange}
          />
          <SfButton
            variant="tertiary"
            square
            className="rounded-l-none"
            aria-controls={inputId}
            aria-label="Increase value"
            onClick={() =>
              increment({
                quantity: value + 1,
                product: product.id,
              })
            }
          >
            <SfIconAdd />
          </SfButton>
        </div>
        <button
          aria-label="Remove"
          type="button"
          className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
          onClick={() => {
            deleteFromCart({
              product: product.id,
            });
          }}
        >
          <SfIconDelete />
          <span className="hidden ml-1.5 sm:block"> Remove </span>
        </button>
      </div>
    </>
  );
};

export default ViewProduct;
