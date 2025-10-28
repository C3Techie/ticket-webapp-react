import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Ticket } from '../../types';
import { Button } from '../ui/Button';

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (ticketId: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onEdit, onDelete }) => {
  const getStatusIcon = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return <AlertCircle size={16} className="text-status-open" aria-hidden="true" focusable="false" />;
      case 'in_progress':
        return <Clock size={16} className="text-status-in-progress" aria-hidden="true" focusable="false" />;
      case 'closed':
        return <CheckCircle size={16} className="text-status-closed" aria-hidden="true" focusable="false" />;
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    // Vue version uses these exact classes for status
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
    }
  };

  const getPriorityColor = (priority?: Ticket['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-bg-card rounded-lg p-6 shadow-md border border-color-border hover:shadow-lg transition-all duration-200"
    >
  <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-text-primary flex-1 pr-4">
          {ticket.title}
        </h3>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(ticket)}
            className="p-2 rounded-md transition-colors text-text-secondary hover:text-text-primary hover:bg-bg-hover"
            aria-label="Edit ticket"
          >
            <Edit2 size={16} aria-hidden="true" focusable="false" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(ticket.id)}
            className="p-2 rounded-md transition-colors text-red-400 hover:text-red-300 hover:bg-red-500/10"
            aria-label="Delete ticket"
          >
            <Trash2 size={16} color="#f87171" aria-hidden="true" focusable="false" />
          </Button>
        </div>
      </div>

      {ticket.description && (
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {ticket.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            ticket.status
          )}`}
        >
          <span className="mr-1">{getStatusIcon(ticket.status)}</span>
          <span className="ml-1 capitalize">
            {ticket.status.replace('_', ' ')}
          </span>
        </span>

        {ticket.priority && (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
              ticket.priority
            )}`}
          >
            <span className="capitalize">{ticket.priority}</span>
          </span>
        )}
      </div>

  <div className="flex justify-between items-center text-xs text-text-muted mt-2">
        <span>Created: {formatDate(ticket.created_at)}</span>
        {ticket.reporter && (
          <span>By: {ticket.reporter}</span>
        )}
      </div>
    </motion.div>
  );
};