import { QueryClient, QueryClientConfig } from "react-query";


const queryClientConfig : QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 30,// 30 seconds
        cacheTime: 1000 * 30, //30 seconds
        refetchOnMount: "always",
        refetchOnWindowFocus: "always",
        refetchOnReconnect: "always",
        refetchInterval: 1000 * 30, //30 seconds
        refetchIntervalInBackground: false,
        suspense: false,
      },
      mutations: {
        retry: 2,
      },
    },
};

export const queryClient = new QueryClient(queryClientConfig);