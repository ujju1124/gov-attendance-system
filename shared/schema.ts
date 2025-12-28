import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // Acts as Employee ID
  password: text("password").notNull(),
  role: text("role", { enum: ["admin", "employee"] }).notNull().default("employee"),
  fullName: text("full_name").notNull(),
  department: text("department").notNull(),
  designation: text("designation").notNull(),
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  employeeId: integer("employee_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(), // The specific day marked
  status: text("status", { enum: ["present", "absent"] }).notNull(),
  verified: boolean("verified").notNull().default(false),
  verifiedBy: integer("verified_by").references(() => users.id), // Admin who verified
  timestamp: timestamp("timestamp").defaultNow(), // When it was marked
});

// === SCHEMAS ===
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertAttendanceSchema = createInsertSchema(attendance).omit({ 
  id: true, 
  verified: true, 
  verifiedBy: true,
  timestamp: true 
});

// === TYPES ===
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;

// Request types
export type LoginRequest = Pick<InsertUser, "username" | "password">;
export type MarkAttendanceRequest = { status: "present" | "absent" };
export type VerifyAttendanceRequest = { verified: boolean; status?: "present" | "absent" };
