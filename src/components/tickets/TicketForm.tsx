import React from 'react';
import { useForm } from 'react-hook-form';
import { Ticket } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TicketFormData {
  title: string;
  description?: string;
  status: Ticket['status'];
  priority?: Ticket['priority'];
  reporter?: string;
}

interface TicketFormProps {
  ticket?: Ticket | null;
  onSubmit: (data: TicketFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const TicketForm: React.FC<TicketFormProps> = ({
  ticket,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TicketFormData>({
    defaultValues: ticket
      ? {
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          priority: ticket.priority,
          reporter: ticket.reporter,
        }
      : {
          status: 'open',
          priority: 'medium',
        },
  });

  const descriptionValue = watch('description') || '';

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2 -mr-2 
                    scrollbar-thin scrollbar-thumb-accent scrollbar-track-bg-card
                    scrollbar-thumb-rounded scrollbar-track-rounded">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pr-2">
        <Input
          label="Title *"
          placeholder="Enter ticket title"
          error={errors.title?.message}
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
            maxLength: {
              value: 150,
              message: 'Title must be less than 150 characters',
            },
          })}
        />

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Enter ticket description (optional)"
            className="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 resize-none"
            {...register('description', {
              maxLength: {
                value: 1000,
                message: 'Description must be less than 1000 characters',
              },
            })}
          />
          {errors.description && (
            <p className="text-sm text-red-400 mt-1">{errors.description.message}</p>
          )}
          <p className="text-xs text-text-muted mt-1">
            {descriptionValue.length}/1000 characters
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Status *
            </label>
            <select
              className="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              {...register('status', { required: true })}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Priority
            </label>
            <select
              className="w-full px-3 py-2 bg-bg-card border border-color-border rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
              {...register('priority')}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <Input
          label="Reporter"
          placeholder="Enter reporter name (optional)"
          {...register('reporter')}
        />

        {/* Sticky buttons at the bottom */}
        <div className="flex justify-end space-x-3 pt-4 pb-2 sticky bottom-0 bg-bg-card -mx-2 px-2 -mb-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {ticket ? 'Update Ticket' : 'Create Ticket'}
          </Button>
        </div>
      </form>
    </div>
  );
};