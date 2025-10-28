import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  color: 'green' | 'yellow' | 'blue' | 'gray';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  color,
}) => {
  const colorClasses = {
    green: 'text-status-open bg-status-open/10',
    yellow: 'text-status-in-progress bg-status-in-progress/10',
    blue: 'text-accent bg-accent/10',
    gray: 'text-status-closed bg-status-closed/10',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-bg-card rounded-xl p-6 shadow-md border border-color-border"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{value}</p>
          <p className="text-text-muted text-sm mt-1">{description}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};