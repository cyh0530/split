import { RouterProvider, createHashRouter } from "react-router-dom";
import { Home } from "@/components/Home";
import Manual from "../Manual";
import { Scan } from "../components/Scan";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/scan",
    element: <Scan />
  },
  {
    path: "/manual",
    element: <Manual />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
