import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Recommendations from "@/pages/Recommendations";
import MarketTrends from "@/pages/MarketTrends";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/recommendations" component={Recommendations} />
          <Route path="/market-trends" component={MarketTrends} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
