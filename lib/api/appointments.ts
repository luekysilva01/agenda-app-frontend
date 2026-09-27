import { apiClient } from './client';

export type AppointmentStatus =
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface Appointment {
  id: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId?: string | null;
  serviceName: string;
  scheduledAt: string;
  durationMinutes: number;
  status: AppointmentStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  userId?: string;
  name: string;
  description?: string | null;
  durationMinutes: number;
  category: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentStats {
  todayCount: number;
  totalScheduled: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  noShow: number;
  attendanceRate: number;
}

export interface CreateAppointmentPayload {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId?: string;
  serviceName: string;
  scheduledAt: string;
  durationMinutes?: number;
  status?: AppointmentStatus;
  notes?: string;
}

export interface UpdateAppointmentPayload {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceName?: string;
  scheduledAt?: string;
  durationMinutes?: number;
  status?: AppointmentStatus;
  notes?: string;
}

export const INITIAL_SERVICES: Service[] = [];

export const appointmentsApi = {
  async getStats(token?: string): Promise<AppointmentStats> {
    try {
      const res = await apiClient<{ success: boolean; stats: AppointmentStats }>(
        '/appointments/stats',
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      return res.stats;
    } catch {
      return {
        todayCount: 0,
        totalScheduled: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
        noShow: 0,
        attendanceRate: 100,
      };
    }
  },

  async getAll(
    token?: string,
    filters?: { status?: string; search?: string; date?: string }
  ): Promise<Appointment[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== 'ALL') params.append('status', filters.status);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.date) params.append('date', filters.date);

      const qs = params.toString() ? `?${params.toString()}` : '';
      const res = await apiClient<{ success: boolean; appointments: Appointment[] }>(
        `/appointments${qs}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      return res.appointments || [];
    } catch {
      return [];
    }
  },

  async getById(id: string, token?: string): Promise<Appointment | null> {
    try {
      const res = await apiClient<{ success: boolean; appointment: Appointment }>(
        `/appointments/${id}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );
      return res.appointment || null;
    } catch {
      return null;
    }
  },

  async create(payload: CreateAppointmentPayload, token?: string): Promise<Appointment> {
    const res = await apiClient<{ success: boolean; appointment: Appointment }>(
      '/appointments',
      {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: JSON.stringify(payload),
      }
    );
    return res.appointment;
  },

  async update(
    id: string,
    payload: UpdateAppointmentPayload,
    token?: string
  ): Promise<Appointment> {
    const res = await apiClient<{ success: boolean; appointment: Appointment }>(
      `/appointments/${id}`,
      {
        method: 'PATCH',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: JSON.stringify(payload),
      }
    );
    return res.appointment;
  },

  async delete(id: string, token?: string): Promise<{ success: boolean; id: string }> {
    return apiClient<{ success: boolean; id: string }>(`/appointments/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },
};

export const servicesApi = {
  async getAll(token?: string): Promise<Service[]> {
    try {
      const res = await apiClient<{ success: boolean; services: Service[] }>('/services', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      return res.services || [];
    } catch {
      return [];
    }
  },

  async create(payload: Partial<Service>, token?: string): Promise<Service> {
    const res = await apiClient<{ success: boolean; service: Service }>('/services', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: JSON.stringify(payload),
    });
    return res.service;
  },

  async update(id: string, payload: Partial<Service>, token?: string): Promise<Service> {
    const res = await apiClient<{ success: boolean; service: Service }>(`/services/${id}`, {
      method: 'PATCH',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: JSON.stringify(payload),
    });
    return res.service;
  },

  async delete(id: string, token?: string): Promise<{ success: boolean; id: string }> {
    return apiClient<{ success: boolean; id: string }>(`/services/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },
};
