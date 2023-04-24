import Manual from "../Manual";
import { Scan } from "../components/Scan";
import { RouterProvider, createHashRouter } from "react-router-dom";


const router = createHashRouter([
    {
        path: "/",
        element: <Scan />
    },
    {
        path: "/manual",
        element: <Manual />
    }
])


export function Router() {
    return <RouterProvider router={router} />
}