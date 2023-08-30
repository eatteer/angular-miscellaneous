import { GroupOption, IncomeRangeOption, StatusOption } from '../app.component';

export const INCOME_RANGES_OPTIONS: IncomeRangeOption[] = [
  {
    value: null,
    label: { translateKey: 'Income ranges' },
    displayValue: {
      translateKey: 'All',
    },
  },
  {
    value: {
      min: 0,
      max: 10,
    },
    label: { translateKey: 'Income ranges' },
    displayValue: {
      translateKey: 'From 0 to 10',
      translateParams: { min: 0, max: 10 },
    },
  },
  {
    value: {
      min: 10,
      max: 20,
    },
    label: { translateKey: 'Income ranges' },
    displayValue: {
      translateKey: 'From 10 to 20',
      translateParams: { min: 10, max: 20 },
    },
  },
  {
    value: {
      min: 20,
      max: 30,
    },
    label: { translateKey: 'Income ranges' },
    displayValue: {
      translateKey: 'From 20 to 30',
      translateParams: { min: 20, max: 30 },
    },
  },
];

export const STATUS_OPTIONS: StatusOption[] = [
  {
    value: 1,
    label: { translateKey: 'States' },
    displayValue: {
      translateKey: 'Available',
    },
  },
  {
    value: 2,
    label: { translateKey: 'States' },
    displayValue: {
      translateKey: 'Not available',
    },
  },
  {
    value: 3,
    label: { translateKey: 'States' },
    displayValue: {
      translateKey: 'Comming soon',
    },
  },
];

export const GROUP_OPTIONS: GroupOption[] = [
  {
    value: 'groupByDate',
    label: { translateKey: 'Groups' },
    displayValue: {
      translateKey: 'Date',
    },
    metaData: { allowedCombinations: [] },
  },
  {
    value: 'groupByMonth',
    label: { translateKey: 'Groups' },
    displayValue: {
      translateKey: 'Month',
    },
    metaData: { allowedCombinations: ['groupByCampaign'] },
  },
  {
    value: 'groupByCampaign',
    label: { translateKey: 'Groups' },
    displayValue: {
      translateKey: 'Campaign',
    },
    metaData: {
      allowedCombinations: ['groupByMonth'],
    },
  },
];

export const DEFAULT_INCOME_RANGE_OPTION = INCOME_RANGES_OPTIONS[0];
export const DEFAULT_SELECTED_STATUS_OPTION = null;
export const DEFAULT_CHECKED_GROUP_OPTIONS = [GROUP_OPTIONS[2]];
