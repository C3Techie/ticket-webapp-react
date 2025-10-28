export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
  reporter?: string;
  userId: string;
}

export interface AuthSession {
  token: string;
  user: User;
  expires_at: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface TicketActivity {
  id: string;
  type: 'created' | 'updated' | 'deleted';
  ticketId: string;
  title: string;
  timestamp: string;
  userId: string;
}