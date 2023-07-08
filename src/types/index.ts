import { ReactNode } from 'react';

export interface ChildrenComponentProps {
  children: ReactNode;
}

export type InputErrorProps = {
  error?: boolean;
  errorMessage?: string;
};

export type SearchFormProps = {
  text: string;
  startDate: Date | null;
  budget?: number;
};
