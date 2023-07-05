import { ReactNode } from 'react';

export interface ChildrenComponentProps {
  children: ReactNode;
}

export type InputErrorProps = {
  error?: boolean;
  errorMessage?: string;
};
