import { useLocation } from "wouter";
import { Building2, Users, CheckCircle2, Shield } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-body">
      {/* Official Header */}
      <header className="bg-white border-b-4 border-secondary sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 py-2">
            <div className="text-center">
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">नेपाल सरकार</p>
              <p className="text-xs text-secondary/80">Government of Nepal</p>
            </div>
          </div>
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-secondary/30 text-secondary">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-secondary font-bold uppercase tracking-wider">संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय</p>
                <h1 className="text-sm md:text-base font-bold text-secondary font-display">
                  Ministry of Federal Affairs & General Administration
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLocation("/login")}
                className="px-4 py-2 text-secondary hover:bg-secondary/5 rounded font-medium transition-colors"
                data-testid="button-login"
              >
                Login
              </button>
              <button
                onClick={() => setLocation("/signup")}
                className="px-4 py-2 bg-secondary text-white hover:bg-secondary/90 rounded font-medium transition-colors"
                data-testid="button-signup"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary font-display">
                Smart Attendance System
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-secondary/80 font-display">
                स्मार्ट उपस्थिति प्रणाली
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                यो प्रणाली सरकारी कार्यालयका कर्मचारीहरूको उपस्थिति व्यवस्थापनलाई डिजिटल बनाउने उद्देश्यले विकास गरिएको हो।
              </p>
              <p className="text-gray-500">
                A digital attendance management system designed for government employees to ensure transparency, accountability, and efficient workforce management.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 text-secondary">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Employee Self-Service</h4>
                <p className="text-gray-600 text-sm">
                  कर्मचारीहरु आफैंले आफ्नो उपस्थिति दर्ज गर्न सक्छन्।
                </p>
                <p className="text-gray-500 text-xs mt-2">Employees can easily mark their attendance</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 text-secondary">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Admin Verification</h4>
                <p className="text-gray-600 text-sm">
                  प्रशासकहरु उपस्थिति सत्यापन गरेर रेकर्ड अनुमोदन गर्छन्।
                </p>
                <p className="text-gray-500 text-xs mt-2">Admins verify and approve attendance records</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 text-secondary">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Transparency & Accountability</h4>
                <p className="text-gray-600 text-sm">
                  पूर्ण पारदर्शिता र जवाफदेहिता सुनिश्चित गर्छ।
                </p>
                <p className="text-gray-500 text-xs mt-2">Complete transparency in attendance tracking</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setLocation("/signup")}
                className="px-8 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                data-testid="button-cta-signup"
              >
                नयाँ खाता खोल्नुहोस् - Register Now
              </button>
              <button
                onClick={() => setLocation("/login")}
                className="px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary/5 transition-colors"
                data-testid="button-cta-login"
              >
                Existing User? Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/5 border-t-4 border-secondary py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-sm font-semibold text-secondary">
            © नेपाल सरकार – कर्मचारी उपस्थिति प्रणाली (प्रोटोटाइप)
          </p>
          <p className="text-xs text-gray-500">
            संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय
          </p>
        </div>
      </footer>
    </div>
  );
}
