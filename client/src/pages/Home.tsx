import { useLocation } from "wouter";
import { Building2, Users, CheckCircle2, Shield } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 font-body relative">
      {/* Watermark Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='5' y='30' font-size='8' fill='%23000' opacity='0.5'%3E%E0%A4%A8%E0%A5%87%E0%A4%AA%E0%A4%BE%E0%A4%B2%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px'
      }}></div>

      {/* Official Header */}
      <header className="bg-gradient-to-b from-white to-gray-50 border-b-4 border-red-600 sticky top-0 z-30 shadow-lg">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-1.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  संघीय लोकतान्त्रिक गणतन्त्र नेपाल
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>आइतबार, २८ डिसेम्बर २०२५</span>
                <span className="text-yellow-300">|</span>
                <span>नेपाली: १४ पौष २०८१</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Government Identity Bar */}
          <div className="border-b-2 border-red-200 py-3 bg-white/50">
            <div className="text-center">
              <p className="text-lg font-bold text-red-700 tracking-wide" style={{fontFamily: 'serif'}}>नेपाल सरकार</p>
              <p className="text-xs text-blue-900 font-semibold tracking-widest uppercase">Government of Nepal</p>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex justify-between items-center py-4 bg-white/80">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center border-4 border-red-600 shadow-xl overflow-hidden">
                  <img
                    src="\images\Emblem_of_Nepal.svg.png"
                    alt="Nepal Government Emblem"
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-900 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex flex-col">
                <p className="text-sm text-red-700 font-bold tracking-wide" style={{fontFamily: 'serif'}}>संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय</p>
                <h1 className="text-base md:text-lg font-bold text-blue-900 font-display tracking-wide">
                  Ministry of Federal Affairs & General Administration
                </h1>
                <p className="text-xs text-gray-600 mt-0.5">सिंहदरबार, काठमाडौं, नेपाल</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocation("/login")}
                className="px-5 py-2.5 text-blue-900 hover:bg-blue-50 rounded-lg font-semibold transition-all border-2 border-blue-200 hover:border-blue-400"
                data-testid="button-login"
              >
                लगइन | Login
              </button>
              <button
                onClick={() => setLocation("/signup")}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                data-testid="button-signup"
              >
                दर्ता | Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-br from-blue-50 via-white to-red-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
        
        {/* Decorative Border Pattern */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900"></div>
        
        <div className="max-w-6xl mx-auto w-full relative">
          <div className="text-center space-y-10">
            {/* Main Title Section */}
            <div className="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-10 shadow-2xl border-t-4 border-red-600">
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-full text-sm font-semibold shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>आधिकारिक सरकारी पोर्टल | Official Government Portal</span>
                </div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-blue-900 bg-clip-text text-transparent" style={{fontFamily: 'serif'}}>
                स्मार्ट उपस्थिति प्रणाली
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 tracking-wide">
                Smart Attendance Management System
              </h3>
              
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"></div>
              
              <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                यो प्रणाली सरकारी कार्यालयका कर्मचारीहरूको उपस्थिति व्यवस्थापनलाई डिजिटल, पारदर्शी र जवाफदेहीताका साथ व्यवस्थित गर्न विकास गरिएको हो।
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A comprehensive digital attendance management system designed for government employees to ensure transparency, accountability, and efficient workforce management across all federal ministries and departments.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="group bg-white rounded-2xl p-8 border-2 border-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">कर्मचारी सेवा</h4>
                  <p className="text-gray-700 font-medium mb-2">
                    कर्मचारीहरु आफैंले आफ्नो दैनिक उपस्थिति दर्जा गर्न सक्छन्।
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-transparent mx-auto my-3"></div>
                  <p className="text-gray-600 text-sm">Employee Self-Service Portal</p>
                  <p className="text-gray-500 text-xs mt-2">Real-time attendance marking with GPS verification</p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-8 border-2 border-red-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-red-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">प्रशासकीय सत्यापन</h4>
                  <p className="text-gray-700 font-medium mb-2">
                    प्रशासकहरु उपस्थिति सत्यापन गरेर रेकर्ड अनुमोदन गर्छन्।
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-red-600 to-transparent mx-auto my-3"></div>
                  <p className="text-gray-600 text-sm">Administrative Verification</p>
                  <p className="text-gray-500 text-xs mt-2">Multi-level approval system with audit trails</p>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-8 border-2 border-green-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-green-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-bl-full opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">पारदर्शिता र जवाफदेहिता</h4>
                  <p className="text-gray-700 font-medium mb-2">
                    पूर्ण पारदर्शिता र जवाफदेहिता सुनिश्चित गर्छ।
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-transparent mx-auto my-3"></div>
                  <p className="text-gray-600 text-sm">Transparency & Accountability</p>
                  <p className="text-gray-500 text-xs mt-2">Complete transparency with detailed reporting</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setLocation("/signup")}
                className="group px-10 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white font-bold rounded-xl hover:from-red-700 hover:via-red-800 hover:to-red-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg relative overflow-hidden"
                data-testid="button-cta-signup"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                <span className="relative">नयाँ खाता खोल्नुहोस् | Register Now</span>
              </button>
              <button
                onClick={() => setLocation("/login")}
                className="group px-10 py-4 border-3 border-blue-900 text-blue-900 font-bold rounded-xl hover:bg-blue-900 hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg relative overflow-hidden"
                data-testid="button-cta-login"
              >
                <span className="absolute inset-0 bg-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                <span className="relative">पहिले नै खाता छ? | Existing User Login</span>
              </button>
            </div>

            {/* Info Banner */}
            <div className="mt-12 bg-gradient-to-r from-blue-900/10 via-transparent to-red-600/10 rounded-xl p-6 border border-blue-200">
              <p className="text-sm text-gray-700 font-medium">
                <span className="text-red-700 font-bold">सूचना:</span> यो प्रणाली नेपाल सरकारको आधिकारिक डिजिटल उपस्थिति व्यवस्थापन प्लेटफर्म हो। सबै सरकारी कर्मचारीहरूलाई यो प्रणाली प्रयोग गर्न अनिवार्य गरिएको छ।
              </p>
              <p className="text-xs text-gray-600 mt-2">
                This is the official digital attendance management platform of the Government of Nepal. All government employees are required to use this system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-blue-900 to-blue-950 border-t-4 border-red-600 py-12 mt-auto relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-white to-blue-900"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left Section */}
            <div className="text-center md:text-left">
              <h5 className="text-white font-bold text-lg mb-3 flex items-center justify-center md:justify-start gap-2">
                <Building2 className="w-5 h-5 text-red-400" />
                <span>मन्त्रालय</span>
              </h5>
              <p className="text-blue-200 text-sm leading-relaxed">
                संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय<br/>
                सिंहदरबार, काठमाडौं<br/>
                नेपाल
              </p>
            </div>

            {/* Center Section */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-blue-100 border-4 border-white/20 shadow-xl mb-4">
                <img
                  src="\images\Emblem_of_Nepal.svg.png"
                  alt="Nepal Emblem"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-white font-bold text-lg" style={{fontFamily: 'serif'}}>
                नेपाल सरकार
              </p>
              <p className="text-blue-200 text-sm font-semibold tracking-wider">
                GOVERNMENT OF NEPAL
              </p>
            </div>

            {/* Right Section */}
            <div className="text-center md:text-right">
              <h5 className="text-white font-bold text-lg mb-3">सम्पर्क | Contact</h5>
              <p className="text-blue-200 text-sm leading-relaxed">
                फोन: +९७७-१-४२११२२२<br/>
                इमेल: info@mofaga.gov.np<br/>
                वेबसाइट: www.mofaga.gov.np
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent my-6"></div>

          {/* Bottom Section */}
          <div className="text-center space-y-3">
            <p className="text-lg font-bold text-white" style={{fontFamily: 'serif'}}>
              © २०८१ नेपाल सरकार – कर्मचारी उपस्थिति व्यवस्थापन प्रणाली
            </p>
            <p className="text-blue-300 text-sm font-medium">
              © 2025 Government of Nepal – Employee Attendance Management System
            </p>
            <p className="text-blue-400 text-xs">
              संघीय मामिला तथा सामान्य प्रशासन मन्त्रालय | Ministry of Federal Affairs & General Administration
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-blue-300">
              <span>सर्वाधिकार सुरक्षित</span>
              <span className="text-red-400">|</span>
              <span>All Rights Reserved</span>
              <span className="text-red-400">|</span>
              <span>Developed for Digital Nepal</span>
            </div>
          </div>
        </div>

        {/* Bottom Accent Bar */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 via-red-600 to-blue-900"></div>
      </footer>
    </div>
  );
}