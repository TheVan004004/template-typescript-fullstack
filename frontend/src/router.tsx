import { useRoutes } from "react-router-dom";
import Homepage from "./views/homepage";

export default function RouterUrl() {
  return useRoutes([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);
}
