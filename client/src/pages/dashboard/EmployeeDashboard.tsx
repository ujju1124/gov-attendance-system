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
          <h1 className="text-2xl font-bold text-gray-900 font-display">Employee Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.fullName}. Manage your daily attendance here.</p>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-secondary" />
              Daily Actions
            </h2>
            <div className="text-sm text-gray-500 font-medium">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </div>
          </div>
          
          <div className="p-8 flex flex-col items-center justify-center text-center">
             {todayRecord ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-md w-full">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <CalendarCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Attendance Marked</h3>
                  <p className="text-green-700 mb-4">
                    You have marked yourself as <span className="font-bold uppercase">{todayRecord.status}</span> today.
                  </p>
                  <p className="text-xs text-green-600">
                    Time: {format(new Date(todayRecord.timestamp!), "h:mm a")}
                  </p>
                </div>
             ) : (
                <div className="max-w-lg w-full space-y-6">
                  <p className="text-gray-600 text-lg">
                    Please mark your attendance for today. Official working hours are 10:00 AM to 5:00 PM.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleMarkAttendance("present")}
                      disabled={markAttendance.isPending}
                      className="group relative flex flex-col items-center p-6 bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 rounded-xl transition-all duration-200"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-green-100 text-gray-500 group-hover:text-green-600 flex items-center justify-center mb-3 transition-colors">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-gray-700 group-hover:text-green-800">I am Present</span>
                      <span className="text-xs text-gray-500 mt-1">Mark full day attendance</span>
                      
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
                      <span className="font-bold text-gray-700 group-hover:text-red-800">I am Absent</span>
                      <span className="text-xs text-gray-500 mt-1">Mark leave/absence</span>
                      
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

        {/* Recent History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Recent Records
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Time Marked</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoadingHistory ? (
                   <tr>
                     <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                       <div className="flex items-center justify-center gap-2">
                         <Loader2 className="w-4 h-4 animate-spin" /> Loading records...
                       </div>
                     </td>
                   </tr>
                ) : attendanceHistory?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No attendance records found.
                    </td>
                  </tr>
                ) : (
                  attendanceHistory?.slice(0, 5).map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {format(new Date(record.date), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                        {record.timestamp ? format(new Date(record.timestamp), "h:mm:ss a") : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={record.status as "present" | "absent"} verified={record.verified} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {record.verified ? (
                          <span className="text-blue-600 font-medium text-xs flex items-center justify-end gap-1">
                            <FileText className="w-3 h-3" /> Verified by Admin
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs italic">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
