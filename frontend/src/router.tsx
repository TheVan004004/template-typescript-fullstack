import { useRoutes } from "react-router-dom";
import { TaskManager } from "./views/homepage";

export default function RouterUrl() {
  return useRoutes([
    {
      path: "/",
      element: <TaskManager />,
    },
  ]);
}
