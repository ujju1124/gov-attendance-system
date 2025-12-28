import { useUser } from "@/hooks/use-auth";
import { useAllAttendance, useVerifyAttendance } from "@/hooks/use-attendance";
import { format } from "date-fns";
import { StatusBadge } from "@/components/StatusBadge";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { Search, Filter, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { data: user } = useUser();
  const { data: allAttendance, isLoading } = useAllAttendance();
  const verifyMutation = useVerifyAttendance();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredData = allAttendance?.filter(record => {
    const matchesFilter = filter === "all" || record.status === filter;
    const matchesSearch = record.employee.fullName.toLowerCase().includes(search.toLowerCase()) || 
                         record.employee.username.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVerify = (id: number, verified: boolean) => {
    verifyMutation.mutate({ id, verified });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary font-display">प्रशासन पोर्टल</h1>
            <p className="text-gray-600">Administration Portal</p>
            <p className="text-gray-500 mt-1">कर्मचारी उपस्थिति र सत्यापन को निरीक्षण गरुहोस्।</p>
            <p className="text-gray-500">Oversee employee attendance and verification.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wide border border-secondary/30">
              व्यवस्थापक पहुँच
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-t-4 border-t-secondary">
            <p className="text-sm font-medium text-secondary/70 uppercase tracking-wide">कुल रेकर्ड</p>
            <p className="text-3xl font-bold text-secondary mt-2 font-display">{allAttendance?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-t-4 border-t-green-600">
            <p className="text-sm font-medium text-green-700 uppercase tracking-wide">आज उपस्थित</p>
            <p className="text-3xl font-bold text-green-700 mt-2 font-display">
              {allAttendance?.filter(r => 
                r.status === 'present' && 
                new Date(r.date).toDateString() === new Date().toDateString()
              ).length || 0}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-t-4 border-t-orange-500">
             <p className="text-sm font-medium text-orange-700 uppercase tracking-wide">सत्यापन प्रतीक्षारत</p>
             <p className="text-3xl font-bold text-orange-700 mt-2 font-display">
               {allAttendance?.filter(r => !r.verified).length || 0}
             </p>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 bg-secondary/5 flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="relative w-full md:w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input 
                 type="text"
                 placeholder="नाम वा आईडी द्वारा खोजुहोस्..."
                 className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
             </div>
             
             <div className="flex items-center gap-2 w-full md:w-auto">
               <Filter className="h-4 w-4 text-gray-400" />
               <select 
                 className="text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                 value={filter}
                 onChange={(e) => setFilter(e.target.value)}
               >
                 <option value="all">All Status</option>
                 <option value="present">Present</option>
                 <option value="absent">Absent</option>
               </select>
             </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Employee</th>
                  <th className="px-6 py-3 font-semibold">Department</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" /> Loading database...
                      </div>
                    </td>
                  </tr>
                ) : filteredData?.length === 0 ? (
                   <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No records match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredData?.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{record.employee.fullName}</span>
                          <span className="text-xs text-gray-500">ID: {record.employee.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {record.employee.department}
                        <div className="text-xs text-gray-400">{record.employee.designation}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                        {format(new Date(record.date), "MMM d, yyyy")}
                        <div className="text-gray-400">
                          {record.timestamp ? format(new Date(record.timestamp), "h:mm a") : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={record.status as "present" | "absent"} verified={record.verified} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {record.verified ? (
                             <button
                              onClick={() => handleVerify(record.id, false)}
                              className="text-gray-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                              title="Revoke Verification"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleVerify(record.id, true)}
                              disabled={verifyMutation.isPending}
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                "bg-secondary text-white hover:bg-secondary/90 shadow-sm"
                              )}
                            >
                              {verifyMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3" />}
                              Verify
                            </button>
                          )}
                        </div>
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
