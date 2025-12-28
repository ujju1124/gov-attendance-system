import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type MarkAttendanceRequest, type VerifyAttendanceRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// === EMPLOYEE HOOKS ===

export function useMyAttendance() {
  return useQuery({
    queryKey: [api.attendance.myHistory.path],
    queryFn: async () => {
      const res = await fetch(api.attendance.myHistory.path);
      if (!res.ok) throw new Error("Failed to fetch attendance history");
      return api.attendance.myHistory.responses[200].parse(await res.json());
    },
  });
}

export function useMarkAttendance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: MarkAttendanceRequest) => {
      const res = await fetch(api.attendance.mark.path, {
        method: api.attendance.mark.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to mark attendance");
      }
      return api.attendance.mark.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.attendance.myHistory.path] });
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// === ADMIN HOOKS ===

export function useAllAttendance() {
  return useQuery({
    queryKey: [api.attendance.list.path],
    queryFn: async () => {
      const res = await fetch(api.attendance.list.path);
      if (!res.ok) throw new Error("Failed to fetch all attendance records");
      return api.attendance.list.responses[200].parse(await res.json());
    },
  });
}

export function useVerifyAttendance() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & VerifyAttendanceRequest) => {
      const url = buildUrl(api.attendance.verify.path, { id });
      const res = await fetch(url, {
        method: api.attendance.verify.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update verification status");
      return api.attendance.verify.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.attendance.list.path] });
      toast({
        title: "Updated",
        description: "Attendance record updated successfully",
      });
    },
  });
}
