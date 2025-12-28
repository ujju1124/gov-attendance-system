import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "present" | "absent";
  verified?: boolean;
}

export function StatusBadge({ status, verified }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize shadow-sm",
          status === "present"
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        )}
      >
        {status}
      </span>
      {verified && (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wide">
          Verified
        </span>
      )}
    </div>
  );
}
