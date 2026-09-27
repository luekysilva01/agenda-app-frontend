export interface PasswordRequirement {
  id: string;
  label: string;
  met: boolean;
}

export interface PasswordAnalysis {
  score: number; // 0 to 4
  level: 'none' | 'weak' | 'fair' | 'good' | 'strong';
  label: string;
  colorClass: string;
  barColorClass: string;
  requirements: PasswordRequirement[];
  isValid: boolean;
}

export function analyzePassword(password: string): PasswordAnalysis {
  const requirements: PasswordRequirement[] = [
    {
      id: 'length',
      label: 'Mínimo de 8 caracteres',
      met: password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'Pelo menos uma letra maiúscula (A-Z)',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'Pelo menos uma letra minúscula (a-z)',
      met: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'Pelo menos um número (0-9)',
      met: /\d/.test(password),
    },
    {
      id: 'special',
      label: 'Pelo menos um caractere especial (@$!%*?&#...)',
      met: /[@$!%*?&#^_\-+=<>.,;:'"/\\|~`(){}[\]]/.test(password),
    },
  ];

  const metCount = requirements.filter((req) => req.met).length;
  const isValid = metCount === requirements.length;

  let score = 0;
  let level: PasswordAnalysis['level'] = 'none';
  let label = 'Nenhuma senha';
  let colorClass = 'text-slate-400';
  let barColorClass = 'bg-slate-200';

  if (password.length > 0) {
    if (metCount <= 2) {
      score = 1;
      level = 'weak';
      label = 'Fraca';
      colorClass = 'text-rose-600';
      barColorClass = 'bg-rose-500';
    } else if (metCount === 3) {
      score = 2;
      level = 'fair';
      label = 'Razoável';
      colorClass = 'text-amber-600';
      barColorClass = 'bg-amber-500';
    } else if (metCount === 4) {
      score = 3;
      level = 'good';
      label = 'Boa';
      colorClass = 'text-blue-600';
      barColorClass = 'bg-blue-500';
    } else {
      score = 4;
      level = 'strong';
      label = 'Muito Forte';
      colorClass = 'text-emerald-600';
      barColorClass = 'bg-emerald-500';
    }
  }

  return {
    score,
    level,
    label,
    colorClass,
    barColorClass,
    requirements,
    isValid,
  };
}
