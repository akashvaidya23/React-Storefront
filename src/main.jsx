import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import NavbarTop from "./Components/NavbarTop.jsx";
import CartDetails from "./Components/CartDetails.jsx";
import HomePage from "./Components/HomePage.jsx";
import Finalize from "./Components/Finalize.jsx";
import ViewProduct from "./Components/ViewProduct.jsx";
import Invoice from "./Components/Invoice.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarTop />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "cart",
        element: <CartDetails />,
      },
      {
        path: "/finalize",
        element: <Finalize />,
      },
      {
        path: "/products/:productId",
        element: <ViewProduct />,
      },
      {
        path: "/invoice",
        element: <Invoice />,
      },
    ],
  },
  // {
  //   path: "cart",
  //   element: <CartDetails />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <App />
  </Provider>
);
