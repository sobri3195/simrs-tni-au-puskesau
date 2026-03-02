import React from 'react';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: string;
  onStepClick?: (stepId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className = '',
}: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  if (orientation === 'vertical') {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                gap: '16px',
                cursor: onStepClick ? 'pointer' : 'default',
              }}
              onClick={() => onStepClick?.(step.id)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isActive
                      ? 'var(--airforce-blue)'
                      : isCompleted
                      ? 'var(--success)'
                      : 'var(--bg-secondary)',
                    color: isActive || isCompleted ? 'white' : 'var(--neutral)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      height: 40,
                      background: isCompleted ? 'var(--success)' : 'var(--line)',
                      marginTop: '8px',
                    }}
                  />
                )}
              </div>
              <div style={{ paddingBottom: index < steps.length - 1 ? '24px' : 0 }}>
                <div
                  style={{
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--fg)' : 'var(--neutral)',
                    marginBottom: '2px',
                  }}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div style={{ fontSize: 13, color: 'var(--neutral)' }}>{step.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {steps.map((step, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <React.Fragment key={step.id}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: onStepClick ? 'pointer' : 'default',
              }}
              onClick={() => onStepClick?.(step.id)}
            >
              <div
                className={`step-number ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: isActive
                    ? 'var(--airforce-blue)'
                    : isCompleted
                    ? 'var(--success)'
                    : 'var(--bg-secondary)',
                  color: isActive || isCompleted ? 'white' : 'var(--neutral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--fg)' : 'var(--neutral)',
                }}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-connector ${isCompleted ? 'completed' : ''}`}
                style={{
                  width: 40,
                  height: 2,
                  background: isCompleted ? 'var(--success)' : 'var(--line)',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
