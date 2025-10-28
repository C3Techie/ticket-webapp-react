import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type: string) => {
    const styles = {
      success: 'bg-status-open border-status-open',
      error: 'bg-red-500 border-red-500',
      warning: 'bg-status-in-progress border-status-in-progress',
      info: 'bg-accent border-accent',
    };
    return styles[type as keyof typeof styles] || styles.info;
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`
              p-4 rounded-md border-l-4 shadow-xl
              text-text-primary bg-bg-card
              ${getToastStyles(toast.type)}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{toast.title}</h4>
                {toast.message && (
                  <p className="text-sm text-text-secondary mt-1">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};