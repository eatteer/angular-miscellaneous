export type MetaForm = {
  [key: string]: {
    label: string;
    type: 'text' | 'select' | 'radio' | 'group';
    group?: MetaForm;
    options?: Array<{
      label: string;
      name?: string;
      value: any;
      metaValue?: any;
    }>;
    metaValue?: any;
  };
};
