import { useState } from "react";
import { useLogin } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Building2, Loader2, ArrowLeft } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (user) => {
          if (user.role === "admin") {
            setLocation("/admin");
          } else {
            setLocation("/dashboard");
          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-body">
      {/* Official Header Strip */}
      <div className="bg-white border-b-4 border-primary shadow-sm py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4 justify-center md:justify-start">
           <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 text-primary shrink-0">
             <Building2 className="w-7 h-7" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-sm font-bold text-primary uppercase tracking-wider">Government of Nepal</h1>
            <h2 className="text-lg font-bold text-secondary font-display">Ministry of Federal Affairs & General Administration</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            <button
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 text-secondary hover:text-secondary/80 mb-6 text-sm font-medium"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 font-display">पोर्टल लगइन</h3>
              <p className="text-sm text-gray-600 mt-1">Portal Login</p>
              <p className="text-sm text-gray-500 mt-2">सिस्टेम अ्याक्सेस गर्न आफ्नो कर्मचारी आईडी दर्ज गरुहोस्।</p>
              <p className="text-xs text-gray-500">Enter your Employee ID to access the system</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Employee ID / Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  placeholder="Enter your ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Authenticating...
                  </>
                ) : (
                  "Secure Login"
                )}
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-2">
              <p className="text-xs text-gray-500">
                खाता बनाएको छैन? Don't have an account?
              </p>
              <button
                onClick={() => setLocation("/signup")}
                className="text-secondary hover:text-secondary/80 underline font-medium text-sm"
                data-testid="button-to-signup"
              >
                Sign Up Here - यहाँ साइन अप गरुहोस्
              </button>
              <p className="text-xs text-gray-400 pt-2">
                Unauthorized access is strictly prohibited under the Electronic Transactions Act.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
             <span>v1.0.0 (Prototype)</span>
             <a href="#" className="hover:text-secondary underline">Help & Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}
