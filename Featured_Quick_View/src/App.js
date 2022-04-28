import { QueryClient, QueryClientProvider } from "react-query";

import ContainerMain from "./Containers/main";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContainerMain />
    </QueryClientProvider>
  );
}

export default App;
