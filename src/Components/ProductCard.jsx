import {
  SfRating,
  SfButton,
  SfLink,
  SfCounter,
  SfIconShoppingCart,
  SfIconCompareArrows,
  SfIconFavorite,
  SfIconSell,
  SfIconPackage,
  SfIconRemove,
  SfIconAdd,
  SfIconWarehouse,
  SfIconSafetyCheck,
  SfIconShoppingCartCheckout,
  useScrollable,
  SfIconDelete,
} from "@storefront-ui/react";
import { useCounter } from "react-use";
import { useId, useState } from "react";
import { clamp } from "@storefront-ui/shared";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  // console.log(props.product);
  const product = props.product;
  const inputId = useId();
  const min = 1;
  const max = 999;
  // console.log(product.product.cartQuantity);
  const [value, { inc, dec, set }] = useCounter(product.cartQuantity || min);
  function handleOnChange(event) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    // console.log("nextValue ", nextValue);
    set(Number(clamp(nextValue, min, max)));
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.value);
  let index = cartItems.findIndex((cartItem) => {
    return cartItem.product == product.id;
  });
  const [cartAdded, setCartAdded] = useState(index !== -1 ? true : false);
  const addToCart1 = (obj) => {
    setCartAdded(true);
    dispatch(addToCart(obj));
  };

  const decrement = (obj) => {
    dec();
    dispatch(addToCart(obj));
    // console.log(obj.quantity);
    if (obj.quantity === 0) {
      setCartAdded(false);
    }
  };

  const increment = (obj) => {
    inc();
    dispatch(addToCart(obj));
  };

  const deleteFromCart = (obj) => {
    dispatch(removeFromCart(obj));
    setCartAdded(false);
    set(min);
  };

  return (
    <section className="md:max-w-[640px]" style={{ padding: "5px" }}>
      {product.discountPercentage > 0 && (
        <div className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
          <SfIconSell size="sm" className="mr-1.5" />
          Sale
        </div>
      )}

      <div>
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt="img"
            width="300px"
            height="150px"
            style={{ height: "200px" }}
          />
        </Link>
      </div>
      <h1 className="mb-1 font-bold typography-headline-4">{product.title}</h1>
      <strong className="block font-bold typography-headline-3">
        {"₹ " +
          product.price +
          "/-" +
          "( -" +
          product.discountPercentage +
          "% )"}
      </strong>
      <div className="inline-flex items-center mt-4 mb-2">
        <SfRating size="xs" value={product.rating} max={5} />
        <SfCounter className="ml-1" size="xs">
          {product.rating}
        </SfCounter>
        <SfLink
          href="#"
          variant="secondary"
          className="ml-2 text-xs text-neutral-500"
        >
          123 reviews
        </SfLink>
      </div>
      <div className="py-4 mb-4 border-gray-200 border-y">
        <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
          <SfIconShoppingCartCheckout />
          {product.cartQuantity} in cart
        </div>
        <div className="items-start xs:flex">
          <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
            {cartAdded || product.cartQuantity > 0 ? (
              <div className="flex items-center justify-between mt-8 sm:mt-0">
                <div className="flex border border-neutral-300 rounded-md">
                  <SfButton
                    variant="tertiary"
                    square
                    className="rounded-r-none p-3"
                    disabled={value <= min}
                    aria-controls={inputId}
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
                    className="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleOnChange}
                  />
                  <SfButton
                    variant="tertiary"
                    square
                    className="rounded-l-none p-3"
                    disabled={value >= max}
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
            ) : (
              <SfButton
                size="lg"
                className="w-full xs:ml-8"
                onClick={() =>
                  addToCart1({
                    quantity: value,
                    product: product.id,
                    save_for_later: 0,
                  })
                }
                slotPrefix={<SfIconShoppingCart size="sm" />}
              >
                Add to cart
              </SfButton>
            )}

            <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
              <strong className="text-neutral-900">{product.stock}</strong> in
              stock
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-4 gap-x-4">
          <SfButton
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconCompareArrows size="sm" />}
          >
            Compare
          </SfButton>
          <SfButton
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconFavorite size="sm" />}
          >
            Add to list
          </SfButton>
        </div>
      </div>
    </section>
  );
}
