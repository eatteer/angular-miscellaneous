export interface IPreview {
  show: boolean;
  position?: DOMRect;
  data?: any;
}

export type TPreviewConfig = Omit<IPreview, 'show'>;
