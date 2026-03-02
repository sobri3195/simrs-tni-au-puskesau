import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, icon, iconPosition = 'left', className = '', ...props }, ref) => {
    const inputId = props.id || props.name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`form-group ${className}`}>
        {label && (
          <label htmlFor={inputId} className={`form-label ${required ? 'form-label-required' : ''}`}>
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          {icon && iconPosition === 'left' && (
            <span style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--neutral)',
              pointerEvents: 'none',
            }}>
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`form-input ${error ? 'error' : ''}`}
            style={{
              paddingLeft: icon && iconPosition === 'left' ? '42px' : undefined,
              paddingRight: icon && iconPosition === 'right' ? '42px' : undefined,
            }}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <span style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--neutral)',
            }}>
              {icon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="form-hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, required, className = '', ...props }, ref) => {
    const textareaId = props.id || props.name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`form-group ${className}`}>
        {label && (
          <label htmlFor={textareaId} className={`form-label ${required ? 'form-label-required' : ''}`}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`form-input form-textarea ${error ? 'error' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="form-error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="form-hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
