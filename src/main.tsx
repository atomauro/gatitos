import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense>
      <QueryClientProvider client={queryClient}>
        {/*         <ReactQueryDevtools initialIsOpen={false} />
         */}{" "}
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
