export interface Group {
  id: string;
  value: string;
  label: string;
  metaData: {
    allowedCombinations: string[];
  };
}
