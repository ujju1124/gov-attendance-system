import { useState } from "react";
import { useLocation } from "wouter";
import { Building2, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    department: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName || !formData.username || !formData.department || !formData.designation || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          username: formData.username,
          department: formData.department,
          designation: formData.designation,
          password: formData.password,
        }),
      });

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Account created! Redirecting to login...",
        });
        setTimeout(() => {
          setLocation("/login");
        }, 1500);
      } else if (response.status === 409) {
        setError("Employee ID already exists");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-body">
      {/* Official Header */}
      <div className="bg-white border-b-4 border-secondary shadow-sm py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-4 justify-center md:justify-start">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-secondary/30 text-secondary">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-sm font-bold text-secondary uppercase tracking-wider">नेपाल सरकार - Government of Nepal</h1>
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
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 font-display">नयाँ खाता खोल्नुहोस्</h3>
              <p className="text-sm text-gray-600 mt-1">Create New Account</p>
              <p className="text-xs text-gray-500 mt-2">Government employees can self-register here</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name (पूरा नाम)
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
                  placeholder="राज कुमार शर्मा"
                  disabled={isLoading}
                  data-testid="input-fullname"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Employee ID (कर्मचारी आईडी)
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
                  placeholder="e.g., EMP2024001"
                  disabled={isLoading}
                  data-testid="input-employeeid"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department (विभाग)
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
                  placeholder="Civil Administration"
                  disabled={isLoading}
                  data-testid="input-department"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Designation (पद)
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
                  placeholder="Clerk"
                  disabled={isLoading}
                  data-testid="input-designation"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password (पासवर्ड)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
                  placeholder="••••••"
                  disabled={isLoading}
                  data-testid="input-password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password (पासवर्ड पुष्टि गरुहोस्)
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-sm"
                  placeholder="••••••"
                  disabled={isLoading}
                  data-testid="input-confirm-password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                data-testid="button-signup-submit"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Creating Account...
                  </>
                ) : (
                  "खाता बनाउनुहोस् - Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
              <p>Already have an account? <button onClick={() => setLocation("/login")} className="text-secondary hover:underline font-medium" data-testid="button-login-link">Login here</button></p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/5 border-t-4 border-secondary py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-gray-500">
          <p>© नेपाल सरकार – कर्मचारी उपस्थिति प्रणाली (प्रोटोटाइप)</p>
        </div>
      </footer>
    </div>
  );
}
