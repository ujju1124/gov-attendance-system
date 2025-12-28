import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useUser } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import EmployeeDashboard from "@/pages/dashboard/EmployeeDashboard";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import AttendanceHistory from "@/pages/AttendanceHistory";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ 
  component: Component, 
  adminOnly = false 
}: { 
  component: React.ComponentType, 
  adminOnly?: boolean 
}) {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-8 h-8 animate-spin text-primary" />
           <p className="text-sm font-medium text-gray-500">Loading System...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Redirect to="/dashboard" />;
  }

  if (!adminOnly && user.role === "admin") {
    // Optional: Redirect admins trying to access employee dashboard
    // return <Redirect to="/admin" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      
      {/* Employee Routes */}
      <Route path="/dashboard">
        <ProtectedRoute component={EmployeeDashboard} />
      </Route>
      <Route path="/history">
        <ProtectedRoute component={AttendanceHistory} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <ProtectedRoute component={AdminDashboard} adminOnly />
      </Route>
      <Route path="/admin/employees">
         {/* Could be a dedicated employee list page, for now reuse dashboard */}
        <ProtectedRoute component={AdminDashboard} adminOnly />
      </Route>
      <Route path="/admin/attendance">
        <ProtectedRoute component={AdminDashboard} adminOnly />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
