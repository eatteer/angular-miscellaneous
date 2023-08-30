import { Group } from '../types/group.interface';

export const GROUPS: Group[] = [
  {
    id: 'groupByDate',
    value: 'groupByDate',
    label: 'Date',
    metaData: {
      allowedCombinations: ['groupByPartnerId'],
    },
  },
  {
    id: 'groupByCampaign',
    value: 'groupByCampaign',
    label: 'Campaign',
    metaData: {
      allowedCombinations: [],
    },
  },
  {
    id: 'groupByPartnerId',
    value: 'groupByPartnerId',
    label: 'Referral',
    metaData: {
      allowedCombinations: ['groupByCampaign'],
    },
  },
];
