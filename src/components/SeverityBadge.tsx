import React from 'react';
import { SeverityLevel } from '../types/plant';
import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
  showIcon?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  className = '',
  showIcon = true
}) => {
  switch (severity) {
    case 'Mild':
      return (
        <span
          id="badge-severity-mild"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300/80 shadow-2xs ${className}`}
        >
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
          Mild Severity
        </span>
      );
    case 'Moderate':
      return (
        <span
          id="badge-severity-moderate"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-900 border border-orange-300/80 shadow-2xs ${className}`}
        >
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />}
          Moderate Severity
        </span>
      );
    case 'Severe':
      return (
        <span
          id="badge-severity-severe"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-900 border border-rose-300/80 shadow-2xs ${className}`}
        >
          {showIcon && <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />}
          Severe Infection
        </span>
      );
    case 'None':
    default:
      return (
        <span
          id="badge-severity-healthy"
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300/80 shadow-2xs ${className}`}
        >
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          Healthy (No Disease)
        </span>
      );
  }
};
