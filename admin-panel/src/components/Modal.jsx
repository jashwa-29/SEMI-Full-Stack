import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * Reusable Modal Component
 * Props:
 *  - isOpen: boolean
 *  - onClose: fn
 *  - title: string
 *  - children: ReactNode
 *  - size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' (default: 'md')
 *  - footer: ReactNode (optional)
 *  - customHeader: ReactNode (optional)
 */
const Modal = ({ isOpen, onClose, title, children, size = 'md', footer, customHeader }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm:  'max-w-sm',
    md:  'max-w-md',
    lg:  'max-w-lg',
    xl:  'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] animate-fadeIn`}
      >
        {/* Header */}
        {customHeader ? (
          <div className="flex-shrink-0">{customHeader}</div>
        ) : (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 flex-shrink-0 bg-gray-50/50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
