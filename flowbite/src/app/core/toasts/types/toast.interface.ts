import { ToastVariant } from './toast-variant.type';

export interface Toast {
  id?: string;
  variant: ToastVariant;
  message: string;
  autoclose?: boolean;
  autoCloseTime?: number;
}
