import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterUrl from "./router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <RouterUrl />
    </QueryClientProvider>
  </BrowserRouter>
);
