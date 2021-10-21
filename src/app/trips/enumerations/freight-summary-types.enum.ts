export enum FreightSummaryTypes {
  Before = 'Before',
  After = 'After',
  When = 'When'
}

export const SEQUENTIAL_FREIGHT_SUMMARY_TYPES = new Map<
  FreightSummaryTypes,
  string
>();
SEQUENTIAL_FREIGHT_SUMMARY_TYPES.set(FreightSummaryTypes.Before, 'Before');
SEQUENTIAL_FREIGHT_SUMMARY_TYPES.set(FreightSummaryTypes.After, 'After');

export const INSTANTANEOURS_FREIGHT_SUMMARY_TYPES = new Map<
  FreightSummaryTypes,
  string
>();
INSTANTANEOURS_FREIGHT_SUMMARY_TYPES.set(FreightSummaryTypes.When, 'When');
