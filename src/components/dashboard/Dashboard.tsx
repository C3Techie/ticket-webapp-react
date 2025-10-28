import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTickets } from '../../hooks/useTickets';
import { StatsCard } from './StatsCard';
import { Button } from '../ui/Button';

export const Dashboard: React.FC = () => {
  const { getTicketStats, isLoading, getRecentActivity } = useTickets();
  const stats = getTicketStats();
  const activity = getRecentActivity();

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-2">
            Overview of your support tickets and their status
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Tickets"
            value={stats.total}
            icon={Ticket}
            description="All tickets"
            color="blue"
          />
          <StatsCard
            title="Open"
            value={stats.open}
            icon={AlertCircle}
            description="Needs attention"
            color="green"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={Clock}
            description="Being worked on"
            color="yellow"
          />
          <StatsCard
            title="Resolved"
            value={stats.closed}
            icon={CheckCircle}
            description="Completed"
            color="gray"
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-card rounded-xl p-6 shadow-md border border-color-border"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                Ticket Management
              </h2>
              <p className="text-text-secondary">
                Create, view, and manage all your support tickets in one place.
              </p>
            </div>
            <Link to="/tickets" className="mt-4 sm:mt-0">
              <Button size="lg">
                Manage Tickets
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-bg-card rounded-xl p-6 shadow-md border border-color-border"
        >
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Recent Activity
          </h3>
          {activity.length === 0 ? (
            <div className="text-center py-8">
              <Ticket className="mx-auto h-12 w-12 text-text-muted mb-4" />
              <p className="text-text-secondary">
                Recent ticket activity will appear here
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-color-border">
              {activity.map((act) => (
                <li key={act.id} className="py-3 flex items-center gap-3">
                  {act.type === 'created' && <AlertCircle className="text-green-400" aria-hidden="true" />}
                  {act.type === 'updated' && <Clock className="text-yellow-400" aria-hidden="true" />}
                  {act.type === 'deleted' && <CheckCircle className="text-gray-400" aria-hidden="true" />}
                  <span className="flex-1 text-text-primary">
                    <span className="capitalize">{act.type}</span> ticket <span className="font-semibold">{act.title}</span>
                  </span>
                  <span className="text-xs text-text-muted">{new Date(act.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
};