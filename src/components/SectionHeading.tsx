import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  children, 
  subtitle,
  className = "" 
}) => {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4 text-gray-900">
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Spezielle Variante für "Präzision trifft auf Innovation"
export const InnovationHeading: React.FC<{ subtitle?: string; className?: string }> = ({ 
  subtitle,
  className = "" 
}) => {
  return (
    <SectionHeading subtitle={subtitle} className={className}>
      Präzision trifft auf
      <span className="block text-[var(--color-blue-600)] font-medium">Innovation</span>
    </SectionHeading>
  );
};
