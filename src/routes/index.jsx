import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Cart from "../pages/Cart";
import CheckOut from "../pages/Checkout";
import DetailProducts from "../pages/DetailProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/detail/:id",
        element: <Detail />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "checkout",
        element: <CheckOut />
      },
      {
        path: "products", 
        element: <DetailProducts />
      },
    ]
  }
]);

export default router;