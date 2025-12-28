import { useState } from "react";
import { useLogin } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Building2, Loader2, ArrowLeft, Shield, Lock, User } from "lucide-react";

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
              <span>आधिकारिक पोर्टल | Official Portal</span>
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
              <p className="text-xs text-gray-600">सिंहदरबार, काठमाडौं</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12 relative">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-red-600/5 rounded-full blur-3xl"></div>

        <div className="max-w-md w-full relative">
          {/* Back Button */}
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700 mb-6 text-sm font-semibold bg-white/80 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            मुख्य पृष्ठमा फर्कनुहोस् | Back to Home
          </button>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{fontFamily: 'serif'}}>सुरक्षित लगइन</h3>
                  <p className="text-blue-200 text-sm font-medium">Secure Portal Login</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-8 space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-xs font-semibold text-blue-900 border border-blue-200">
                  <Lock className="w-3 h-3" />
                  <span>आधिकारिक प्रमाणिकरण | Official Authentication</span>
                </div>
                <p className="text-gray-700 font-medium mt-4">सिस्टममा प्रवेश गर्न आफ्नो कर्मचारी आईडी प्रयोग गर्नुहोस्।</p>
                <p className="text-sm text-gray-600">Enter your Employee ID to access the system</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-900" />
                    <span>कर्मचारी आईडी | Employee ID / Username</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="emp001 or username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-600" />
                    <span>गोप्य शब्द | Password</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loginMutation.isPending}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>प्रमाणिकरण गर्दै... | Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                      <Shield className="w-5 h-5 relative" />
                      <span className="relative">सुरक्षित लगइन गर्नुहोस् | Secure Login</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <span className="text-xs text-gray-500 font-medium">वा | OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              {/* Sign Up Section */}
              <div className="text-center space-y-3 bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 border border-blue-100">
                <p className="text-sm text-gray-700 font-medium">
                  खाता बनाएको छैन? | Don't have an account?
                </p>
                <button
                  onClick={() => setLocation("/signup")}
                  className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 font-bold text-sm bg-white px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-blue-200 hover:border-blue-400"
                  data-testid="button-to-signup"
                >
                  नयाँ खाता दर्ता गर्नुहोस् | Sign Up Here
                </button>
              </div>

              {/* Warning */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-xs text-red-800 font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>सूचना: अनधिकृत पहुँच कानुनी रूपमा दण्डनीय अपराध हो।</span>
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Unauthorized access is strictly prohibited under the Electronic Transactions Act, 2063.
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 px-8 py-4 border-t-2 border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <span className="text-gray-600 font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                संस्करण v1.0.0 (सुरक्षित)
              </span>
              <div className="flex items-center gap-4">
                <a href="#" className="text-blue-900 hover:text-blue-700 font-semibold underline">सहायता | Help</a>
                <span className="text-gray-400">|</span>
                <a href="#" className="text-blue-900 hover:text-blue-700 font-semibold underline">समर्थन | Support</a>
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold text-gray-700">SSL सुरक्षित</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-blue-900" />
                <span className="text-xs font-semibold text-gray-700">256-bit Encryption</span>
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