import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth } from "./auth";
import passport from "passport";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Authentication
  setupAuth(app);

  // === Auth Routes ===
  app.post(api.auth.login.path, passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  // === User Routes ===
  app.get(api.users.list.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") {
      return res.sendStatus(403);
    }
    const users = await storage.getAllUsers();
    res.json(users);
  });

  // === Attendance Routes ===
  app.get(api.attendance.list.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") {
      return res.sendStatus(403);
    }
    const records = await storage.getAllAttendance();
    res.json(records);
  });

  app.get(api.attendance.myHistory.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const records = await storage.getAttendanceByEmployee(req.user.id);
    res.json(records);
  });

  app.post(api.attendance.mark.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // Check if already marked for today? (Prototype: Allow multiple or just create)
    // For MVP, we just insert.
    const input = api.attendance.mark.input.parse(req.body);
    const record = await storage.createAttendance({
      employeeId: req.user.id,
      date: new Date(),
      status: input.status,
    });
    res.status(201).json(record);
  });

  app.patch(api.attendance.verify.path, async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") {
      return res.sendStatus(403);
    }
    const id = Number(req.params.id);
    const input = api.attendance.verify.input.parse(req.body);
    
    const updates: any = { verified: input.verified };
    if (input.verified) {
      updates.verifiedBy = req.user.id;
    }
    if (input.status) {
      updates.status = input.status;
    }

    const updated = await storage.updateAttendance(id, updates);
    res.json(updated);
  });

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const users = await storage.getAllUsers();
  if (users.length === 0) {
    console.log("Seeding database...");
    
    // Create Admin
    await storage.createUser({
      username: "admin",
      password: "admin123", // Plain text for prototype simplicity
      role: "admin",
      fullName: "System Administrator",
      department: "IT Dept",
      designation: "Chief Officer"
    });

    // Create Employees
    await storage.createUser({
      username: "emp01",
      password: "password",
      role: "employee",
      fullName: "Ram Bahadur",
      department: "Civil Administration",
      designation: "Clerk"
    });

    await storage.createUser({
      username: "emp02",
      password: "password",
      role: "employee",
      fullName: "Sita Kumari",
      department: "Finance",
      designation: "Accountant"
    });

    console.log("Database seeded!");
  }
}
