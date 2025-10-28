import { useState, useEffect } from 'react';
import { Ticket, TicketActivity } from '../types';
import { storage } from '../utils/storage';
import { useAuth } from './useAuth';

const ACTIVITY_KEY = 'ticketapp_activity';

function addActivity(activity: TicketActivity) {
  const activities: TicketActivity[] = storage.get(ACTIVITY_KEY) || [];
  activities.unshift(activity);
  storage.set(ACTIVITY_KEY, activities.slice(0, 10)); // keep last 10
}

function getRecentActivity(): TicketActivity[] {
  return storage.get(ACTIVITY_KEY) || [];
}

export const useTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const loadTickets = () => {
    const storedTickets = storage.get<Ticket[]>('ticketapp_tickets') || [];
    if (user?.id) {
      setTickets(storedTickets.filter(t => t.userId === user.id));
    } else {
      setTickets([]);
    }
    setIsLoading(false);
  };

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'created_at' | 'updated_at' | 'userId'>) => {
    if (!user?.id) return null;
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      userId: user.id,
    };
    const allTickets = storage.get<Ticket[]>('ticketapp_tickets') || [];
    const updatedTickets = [...allTickets, newTicket];
    setTickets(updatedTickets.filter(t => t.userId === user.id));
    storage.set('ticketapp_tickets', updatedTickets);
    addActivity({
      id: Date.now().toString(),
      type: 'created',
      ticketId: newTicket.id,
      title: newTicket.title,
      timestamp: newTicket.created_at,
      userId: user.id,
    });
    return newTicket;
  };

  const updateTicket = (id: string, updates: Partial<Omit<Ticket, 'id' | 'created_at' | 'userId'>>) => {
    if (!user?.id) return;
    const allTickets = storage.get<Ticket[]>('ticketapp_tickets') || [];
    const updatedTickets = allTickets.map(ticket =>
      ticket.id === id && ticket.userId === user.id
        ? { ...ticket, ...updates, updated_at: new Date().toISOString() }
        : ticket
    );
    setTickets(updatedTickets.filter(t => t.userId === user.id));
    storage.set('ticketapp_tickets', updatedTickets);
    const updated = updatedTickets.find(t => t.id === id && t.userId === user.id);
    if (updated) {
      addActivity({
        id: Date.now().toString(),
        type: 'updated',
        ticketId: updated.id,
        title: updated.title,
        timestamp: updated.updated_at,
        userId: user.id,
      });
    }
  };

  const deleteTicket = (id: string) => {
    if (!user?.id) return;
    const allTickets = storage.get<Ticket[]>('ticketapp_tickets') || [];
    const ticket = allTickets.find(t => t.id === id && t.userId === user.id);
    const updatedTickets = allTickets.filter(ticket => !(ticket.id === id && ticket.userId === user.id));
    setTickets(updatedTickets.filter(t => t.userId === user.id));
    storage.set('ticketapp_tickets', updatedTickets);
    if (ticket) {
      addActivity({
        id: Date.now().toString(),
        type: 'deleted',
        ticketId: ticket.id,
        title: ticket.title,
        timestamp: new Date().toISOString(),
        userId: user.id,
      });
    }
  };

  const getTicketStats = () => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === 'open').length;
    const inProgress = tickets.filter(t => t.status === 'in_progress').length;
    const closed = tickets.filter(t => t.status === 'closed').length;

    return { total, open, inProgress, closed };
  };

  const getRecentActivityByUser = () => {
    if (!user?.id) return [];
    const all = getRecentActivity();
    return all.filter(a => a.userId === user.id);
  };

  return {
    tickets,
    isLoading,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketStats,
    refetch: loadTickets,
    getRecentActivity: getRecentActivityByUser,
  };
};