import { db } from "./db";
import { users, attendance, type User, type InsertUser, type Attendance, type InsertAttendance } from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Attendance operations
  createAttendance(attendance: InsertAttendance): Promise<Attendance>;
  getAttendanceByEmployee(employeeId: number): Promise<Attendance[]>;
  getAllAttendance(): Promise<(Attendance & { employee: User })[]>; // For admin
  getAttendanceById(id: number): Promise<Attendance | undefined>;
  updateAttendance(id: number, updates: Partial<Attendance>): Promise<Attendance>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.fullName);
  }

  async createAttendance(record: InsertAttendance): Promise<Attendance> {
    const [newRecord] = await db.insert(attendance).values(record).returning();
    return newRecord;
  }

  async getAttendanceByEmployee(employeeId: number): Promise<Attendance[]> {
    return await db.select()
      .from(attendance)
      .where(eq(attendance.employeeId, employeeId))
      .orderBy(desc(attendance.date));
  }

  async getAllAttendance(): Promise<(Attendance & { employee: User })[]> {
    // Join with users to get employee details
    const records = await db.select({
      attendance: attendance,
      employee: users,
    })
    .from(attendance)
    .innerJoin(users, eq(attendance.employeeId, users.id))
    .orderBy(desc(attendance.date));

    return records.map(r => ({ ...r.attendance, employee: r.employee }));
  }

  async getAttendanceById(id: number): Promise<Attendance | undefined> {
    const [record] = await db.select().from(attendance).where(eq(attendance.id, id));
    return record;
  }

  async updateAttendance(id: number, updates: Partial<Attendance>): Promise<Attendance> {
    const [updated] = await db.update(attendance)
      .set(updates)
      .where(eq(attendance.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
