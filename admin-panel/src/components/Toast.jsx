import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * Reusable Toast Notification Component
 * @param {string} type - 'success', 'error', or 'info'
 * @param {string} message - Message to display
 * @param {function} onClose - Optional close handler
 */
const Toast = ({ type = 'success', message, onClose }) => {
  if (!message) return null;

  const bgColor = type === 'success'
    ? 'bg-emerald-600'
    : type === 'error'
      ? 'bg-red-600'
      : 'bg-primary-600';

  return createPortal(
    <div className={`fixed top-6 right-6 z-[1000] flex items-center gap-3 rounded-2xl px-6 py-4 text-white shadow-2xl animate-fadeIn ${bgColor}`}>
      {type === 'success' ? (
        <div className="flex size-8 items-center justify-center rounded-xl bg-white/20 text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : (
        <X size={18} />
      )}
      <span className="text-sm font-bold tracking-tight">{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
          <X size={16} />
        </button>
      )}
    </div>,
    document.body
  );
};

export default Toast;
