import { ReactNode } from "react";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { LogOut, LayoutDashboard, History, Users, Menu, X, Building2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location] = useLocation();

  const isAdmin = user?.role === "admin";

  const navItems = [
    {
      label: "Dashboard",
      href: isAdmin ? "/admin" : "/dashboard",
      icon: LayoutDashboard,
    },
    ...(isAdmin
      ? [
          { label: "Employees", href: "/admin/employees", icon: Users },
          { label: "Attendance Logs", href: "/admin/attendance", icon: History },
        ]
      : [
          { label: "My History", href: "/history", icon: History },
        ]),
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      {/* Official Header */}
      <header className="bg-white border-b border-gray-200 official-border-top sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="md:hidden">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 text-secondary hover:bg-gray-100 rounded-md"
                >
                  {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
              
              {/* Emblem / Logo Area */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 text-primary shrink-0">
                   <Building2 className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xs font-bold text-primary uppercase tracking-wider leading-tight">Government of Nepal</h1>
                  <h2 className="text-sm md:text-base font-bold text-secondary leading-tight font-display">
                    Ministry of Federal Affairs
                  </h2>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{user?.designation}</p>
              </div>
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="flex flex-col gap-1 sticky top-32">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href} className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-secondary text-white shadow-md shadow-secondary/20" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}>
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative w-64 bg-white shadow-xl flex flex-col h-full animate-in slide-in-from-left duration-200">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-display font-bold text-secondary">Menu</h3>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                    <item.icon className="h-5 w-5 text-gray-500" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-100">
                 <button
                  onClick={() => logout()}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 font-body">
            © 2024 Government of Nepal – Attendance Management System (Prototype)
          </p>
        </div>
      </footer>
    </div>
  );
}
