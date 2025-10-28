import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Ticket as TicketIcon } from 'lucide-react';
import { Ticket } from '../../types';
import { useTickets } from '../../hooks/useTickets';
import { useToast } from '../../hooks/useToast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TicketCard } from './TicketCard';
import { TicketForm } from './TicketForm';
import { Modal } from '../ui/Modal';

export const TicketManagement: React.FC = () => {
  const { tickets, createTicket, updateTicket, deleteTicket, isLoading } = useTickets();
  const { success, error } = useToast();
  
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deletingTicket, setDeletingTicket] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateTicket = async (data: any) => {
    try {
      createTicket(data);
      success('Ticket Created', 'The ticket has been created successfully.');
      setShowForm(false);
    } catch (err) {
      error('Creation Failed', 'There was an issue creating the ticket.');
    }
  };

  const handleUpdateTicket = async (data: any) => {
    if (!editingTicket) return;
    
    try {
      updateTicket(editingTicket.id, data);
      success('Ticket Updated', 'The ticket has been updated successfully.');
      setEditingTicket(null);
    } catch (err) {
      error('Update Failed', 'There was an issue updating the ticket.');
    }
  };

  const handleDeleteTicket = async () => {
    if (!deletingTicket) return;
    
    try {
      deleteTicket(deletingTicket);
      success('Ticket Deleted', 'The ticket has been deleted successfully.');
      setDeletingTicket(null);
    } catch (err) {
      error('Deletion Failed', 'There was an issue deleting the ticket.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
  <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Ticket Management</h1>
            <p className="text-text-secondary mt-2">
              Create and manage support tickets for your projects
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0"
          >
            <Plus size={20} className="mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-text-muted mb-4">
              <TicketIcon className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg">No tickets found</p>
              <p className="text-sm mt-2">
                {tickets.length === 0 
                  ? "Get started by creating your first ticket."
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
            {tickets.length === 0 && (
              <Button onClick={() => setShowForm(true)}>
                Create Your First Ticket
              </Button>
            )}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={setEditingTicket}
                  onDelete={setDeletingTicket}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Create/Edit Modal */}
        <Modal
          isOpen={showForm || !!editingTicket}
          onClose={() => {
            setShowForm(false);
            setEditingTicket(null);
          }}
          title={editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
        >
          <TicketForm
            ticket={editingTicket}
            onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
            onCancel={() => {
              setShowForm(false);
              setEditingTicket(null);
            }}
          />
        </Modal>

        {/* Delete Confirmation Modal (matches Vue version) */}
        {deletingTicket && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
            onClick={() => setDeletingTicket(null)}
          >
            <div
              className="bg-bg-card rounded-xl shadow-xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-color-border">
                <h2 className="text-lg font-semibold text-text-primary">Confirm Deletion</h2>
                <button
                  onClick={() => setDeletingTicket(null)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-text-secondary">
                  Are you sure you want to delete this ticket? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeletingTicket(null)}
                    className="px-4 py-2 border border-color-border text-text-secondary rounded-md hover:bg-bg-hover transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteTicket}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Delete Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};