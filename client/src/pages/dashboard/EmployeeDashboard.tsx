import { useUser } from "@/hooks/use-auth";
import { useMyAttendance, useMarkAttendance } from "@/hooks/use-attendance";
import { format } from "date-fns";
import { StatusBadge } from "@/components/StatusBadge";
import { UserCheck, Clock, MapPin, Loader2, CalendarCheck, FileText } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function EmployeeDashboard() {
  const { data: user } = useUser();
  const { data: attendanceHistory, isLoading: isLoadingHistory } = useMyAttendance();
  const markAttendance = useMarkAttendance();

  // Check if attendance is marked for today
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = attendanceHistory?.find(
    (record) => new Date(record.date).toISOString().split('T')[0] === today
  );

  const handleMarkAttendance = (status: "present" | "absent") => {
    markAttendance.mutate({ status });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-display">कर्मचारी ड्यासबोर्ड</h1>
          <p className="text-gray-600">Employee Dashboard</p>
          <p className="text-gray-500 mt-1">स्वागतम, {user?.fullName}। यहाँ आफ्नो दैनिक उपस्थिति व्यवस्थापन गरुहोस्।</p>
          <p className="text-gray-500">Welcome back, {user?.fullName}. Manage your daily attendance here.</p>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-secondary/5 flex justify-between items-center">
            <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              आज को क्रियाकलाप
            </h2>
            <div className="text-sm text-gray-600 font-medium">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </div>
          </div>
          
          <div className="p-8 flex flex-col items-center justify-center text-center">
             {todayRecord ? (
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 max-w-md w-full">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CalendarCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">उपस्थिति दर्ज गरिएको</h3>
                  <p className="text-green-700 mb-4">
                    तपाईंले आज <span className="font-bold uppercase">{todayRecord.status}</span> रूपमा आफूलाई दर्ज गर्नुभएको छ।
                  </p>
                  <p className="text-xs text-green-600">
                    समय: {format(new Date(todayRecord.timestamp!), "h:mm a")}
                  </p>
                </div>
             ) : (
                <div className="max-w-lg w-full space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-gray-700 text-lg font-medium">
                      आज को उपस्थिति दर्ज गरुहोस्
                    </p>
                    <p className="text-gray-600">
                      Please mark your attendance for today. Official working hours are 10:00 AM to 5:00 PM.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleMarkAttendance("present")}
                      disabled={markAttendance.isPending}
                      className="group relative flex flex-col items-center p-6 bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 rounded-xl transition-all duration-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-green-100 text-gray-500 group-hover:text-green-600 flex items-center justify-center mb-3 transition-colors">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-green-800">मैं उपस्थित छु</span>
                      <span className="text-xs text-gray-500 mt-1">पूरो दिन को उपस्थिति दर्ज गरुहोस्</span>
                      
                      {markAttendance.isPending && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
                          <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => handleMarkAttendance("absent")}
                      disabled={markAttendance.isPending}
                      className="group relative flex flex-col items-center p-6 bg-white border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-red-100 text-gray-500 group-hover:text-red-600 flex items-center justify-center mb-3 transition-colors">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-red-800">मैं अनुपस्थित छु</span>
                      <span className="text-xs text-gray-500 mt-1">अवकाश/अनुपस्थिति दर्ज गरुहोस्</span>
                      
                      {markAttendance.isPending && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
                          <Loader2 className="w-6 h-6 animate-spin text-red-600" />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
             )}
          </div>
        </div>

        {/* Quick Action */}
        <div className="bg-secondary/5 border-2 border-secondary rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-secondary">मेरो पूरा इतिहास हेर्नुहोस्</h3>
              <p className="text-sm text-gray-600 mt-1">View your complete attendance history and verification status</p>
            </div>
            <a
              href="/history"
              className="px-6 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors whitespace-nowrap"
              data-testid="button-view-history"
            >
              सम्पूर्ण इतिहास → View All
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
