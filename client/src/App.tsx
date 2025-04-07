import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, withAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import PublicLayout from "@/components/PublicLayout";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Recommendations from "@/pages/Recommendations";
import MarketTrends from "@/pages/MarketTrends";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

// Wrap components with auth protection
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile = withAuth(Profile);
const ProtectedRecommendations = withAuth(Recommendations);
const ProtectedMarketTrends = withAuth(MarketTrends);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Switch>
          {/* Public Routes */}
          <Route path="/login">
            <PublicLayout>
              <Login />
            </PublicLayout>
          </Route>
          
          {/* Protected Routes */}
          <Route path="/">
            <Layout>
              <ProtectedDashboard />
            </Layout>
          </Route>
          <Route path="/profile">
            <Layout>
              <ProtectedProfile />
            </Layout>
          </Route>
          <Route path="/recommendations">
            <Layout>
              <ProtectedRecommendations />
            </Layout>
          </Route>
          <Route path="/market-trends">
            <Layout>
              <ProtectedMarketTrends />
            </Layout>
          </Route>
          
          {/* 404 Route */}
          <Route>
            <Layout>
              <NotFound />
            </Layout>
          </Route>
        </Switch>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
