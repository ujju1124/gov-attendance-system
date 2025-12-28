import { z } from 'zod';
import { insertUserSchema, insertAttendanceSchema, users, attendance } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login',
      input: z.object({
        username: z.string(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout',
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.unauthorized,
      },
    },
  },
  users: {
    list: {
      method: 'GET' as const,
      path: '/api/users',
      responses: {
        200: z.array(z.custom<typeof users.$inferSelect>()),
        403: errorSchemas.unauthorized,
      },
    },
  },
  attendance: {
    list: {
      method: 'GET' as const,
      path: '/api/attendance', // Admin view all
      responses: {
        200: z.array(z.custom<typeof attendance.$inferSelect & { employee: typeof users.$inferSelect }>()),
      },
    },
    myHistory: {
      method: 'GET' as const,
      path: '/api/attendance/me',
      responses: {
        200: z.array(z.custom<typeof attendance.$inferSelect>()),
      },
    },
    mark: {
      method: 'POST' as const,
      path: '/api/attendance',
      input: z.object({ status: z.enum(["present", "absent"]) }),
      responses: {
        201: z.custom<typeof attendance.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    verify: {
      method: 'PATCH' as const,
      path: '/api/attendance/:id/verify',
      input: z.object({ 
        verified: z.boolean(),
        status: z.enum(["present", "absent"]).optional() 
      }),
      responses: {
        200: z.custom<typeof attendance.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
