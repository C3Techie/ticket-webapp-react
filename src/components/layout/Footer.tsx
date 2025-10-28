import React from 'react';
import { Ticket } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-card border-t border-color-border mt-auto">
  <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Ticket className="h-6 w-6 text-accent" />
            <span className="text-lg font-semibold text-text-primary">TicketFlow</span>
          </div>
          
          <div className="text-text-secondary text-sm">
            <p>&copy; 2025 TicketFlow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};