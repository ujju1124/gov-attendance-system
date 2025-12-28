import { useUser } from "@/hooks/use-auth";
import { useMyAttendance } from "@/hooks/use-attendance";
import { format } from "date-fns";
import { StatusBadge } from "@/components/StatusBadge";
import { Layout } from "@/components/Layout";
import { FileText, Loader2 } from "lucide-react";

export default function AttendanceHistory() {
  const { data: user } = useUser();
  const { data: attendanceHistory, isLoading } = useMyAttendance();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary font-display">मेरो उपस्थिति इतिहास</h1>
          <p className="text-gray-600">My Attendance History</p>
          <p className="text-gray-500 mt-1">{user?.fullName} - {user?.designation}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-secondary/5">
            <h2 className="text-lg font-bold text-secondary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              सम्पूर्ण रेकर्ड
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">मिति</th>
                  <th className="px-6 py-3 font-semibold">समय दर्ज गरिएको</th>
                  <th className="px-6 py-3 font-semibold">स्थिति</th>
                  <th className="px-6 py-3 font-semibold text-right">सत्यापन</th>
                </tr>
                <tr>
                  <th className="px-6 py-2 font-normal text-xs">Date</th>
                  <th className="px-6 py-2 font-normal text-xs">Time Marked</th>
                  <th className="px-6 py-2 font-normal text-xs">Status</th>
                  <th className="px-6 py-2 font-normal text-xs text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> लोड गर्दै...
                      </div>
                    </td>
                  </tr>
                ) : attendanceHistory?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      कुनै रेकर्ड भेटिएन। No attendance records found.
                    </td>
                  </tr>
                ) : (
                  attendanceHistory?.map((record) => (
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
                          <span className="text-blue-600 font-medium text-xs">
                            व्यवस्थापक द्वारा सत्यापित
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs italic">प्रतीक्षारत</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {attendanceHistory && attendanceHistory.length > 0 && (
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>कुल रेकर्ड: {attendanceHistory.length}</span>
                <div className="space-x-4 text-xs">
                  <span>
                    उपस्थित: <span className="font-bold text-green-700">
                      {attendanceHistory.filter(r => r.status === "present").length}
                    </span>
                  </span>
                  <span>
                    अनुपस्थित: <span className="font-bold text-red-700">
                      {attendanceHistory.filter(r => r.status === "absent").length}
                    </span>
                  </span>
                  <span>
                    सत्यापित: <span className="font-bold text-blue-700">
                      {attendanceHistory.filter(r => r.verified).length}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
