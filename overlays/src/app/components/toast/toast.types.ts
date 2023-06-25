export type ToastVariant = 'white' | 'success' | 'warning' | 'danger';

export interface ToastConfig {
  title: string;
  message: string;
  variant?: ToastVariant;
  closable?: boolean;
  autoclose?: boolean;
  timeout?: number;
}
