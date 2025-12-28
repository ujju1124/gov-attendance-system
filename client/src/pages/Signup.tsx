import { useState } from "react";
import { useLocation } from "wouter";
import { Building2, Loader2, ArrowLeft, Shield, User, Briefcase, Building, Lock, CheckCircle2, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 font-body relative">
      {/* Watermark Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='5' y='30' font-size='8' fill='%23000' opacity='0.5'%3E%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px'
      }}></div>

      {/* Official Header */}
      <header className="bg-gradient-to-b from-white to-gray-50 border-b-4 border-red-600 shadow-lg relative z-10">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-1.5">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center text-xs">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                संघीय लोकतान्त्रिक गणतन्त्र नेपाल
              </span>
              <span>आधिकारिक दर्ता पोर्टल | Official Registration Portal</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-4">
          {/* Government Identity */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center border-4 border-red-600 shadow-lg overflow-hidden">
                <img
                  src="\images\Emblem_of_Nepal.svg.png"
                  alt="Nepal Government Emblem"
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-900 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs text-red-700 font-bold" style={{fontFamily: 'serif'}}>संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय</p>
              <h1 className="text-sm md:text-base font-bold text-blue-900 tracking-wide">Ministry of Federal Affairs & General Administration</h1>
              <p className="text-xs text-gray-600">कर्मचारी दर्ता प्रणाली | Employee Registration System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-red-600/5 rounded-full blur-3xl"></div>

        <div className="max-w-2xl w-full relative">
          {/* Back Button */}
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 mb-6 text-sm font-semibold bg-white/80 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" />
            मुख्य पृष्ठमा फर्कनुहोस् | Back to Home
          </button>

          {/* Signup Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{fontFamily: 'serif'}}>नयाँ खाता दर्ता</h3>
                    <p className="text-red-100 text-sm font-medium">Employee Registration</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/20">
                  <Shield className="w-3 h-3" />
                  <span>सरकारी कर्मचारी मात्र | For Government Employees Only</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-700 font-medium">सरकारी कर्मचारीहरू यहाँ आफ्नो खाता स्वतः दर्ता गर्न सक्नुहुन्छ।</p>
                <p className="text-sm text-gray-600 mt-1">Government employees can self-register here</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">त्रुटि | Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-900" />
                      <span>पूरा नाम | Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="राज कुमार शर्मा"
                      disabled={isLoading}
                      data-testid="input-fullname"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-600" />
                      <span>कर्मचारी आईडी | Employee ID</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="EMP2024001"
                      disabled={isLoading}
                      data-testid="input-employeeid"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-600" />
                      <span>विभाग | Department</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Civil Administration"
                      disabled={isLoading}
                      data-testid="input-department"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <span>पद | Designation</span>
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="Senior Officer"
                      disabled={isLoading}
                      data-testid="input-designation"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-orange-600" />
                      <span>पासवर्ड | Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="••••••••"
                      disabled={isLoading}
                      data-testid="input-password"
                    />
                    <p className="text-xs text-gray-500 mt-1">कम्तिमा ६ अक्षर | Minimum 6 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>पुष्टि गर्नुहोस् | Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="••••••••"
                      disabled={isLoading}
                      data-testid="input-confirm-password"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mt-8 relative overflow-hidden group"
                  data-testid="button-signup-submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>खाता बनाउँदै... | Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      <CheckCircle2 className="w-5 h-5 relative" />
                      <span className="relative">खाता बनाउनुहोस् | Create Account</span>
                    </>
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <div className="text-center space-y-3 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border border-blue-100">
                  <p className="text-sm text-gray-700 font-medium">
                    पहिले नै खाता छ? | Already have an account?
                  </p>
                  <button
                    onClick={() => setLocation("/login")}
                    className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 font-bold text-sm bg-white px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-blue-200 hover:border-blue-400"
                    data-testid="button-login-link"
                  >
                    यहाँ लगइन गर्नुहोस् | Login Here
                  </button>
                </div>
              </div>

              {/* Terms Notice */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800 font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    दर्ता गरेर, तपाईं नेपाल सरकारको नियम र सर्तहरू स्वीकार गर्नुहुन्छ। गलत जानकारी प्रदान गर्नु कानुनी अपराध हो।
                    <br />
                    <span className="text-yellow-700">By registering, you accept the terms and conditions of the Government of Nepal. Providing false information is a legal offense.</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-8 py-4 border-t-2 border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                सुरक्षित दर्ता प्रणाली | Secure Registration
              </span>
              <div className="flex items-center gap-4">
                <a href="#" className="text-blue-900 hover:text-blue-700 font-semibold underline">सहायता | Help</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-blue-900 hover:text-blue-700 font-semibold underline">समर्थन | Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-950 py-4 border-t-4 border-red-600 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-white to-blue-900"></div>
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-blue-200 font-medium">
            © २०८१ नेपाल सरकार – कर्मचारी उपस्थिति व्यवस्थापन प्रणाली | © 2025 Government of Nepal
          </p>
          <p className="text-xs text-blue-400 mt-1">
            सर्वाधिकार सुरक्षित | All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}