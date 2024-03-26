const numberWithGroupAndDecimalSeparator = 1000.1;
const intl = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const parts = intl.formatToParts(numberWithGroupAndDecimalSeparator);

const groupSeperator = parts.find(({type}) => type === 'group')?.value ?? ',';

const decimalSeperator =
  parts.find(({type}) => type === 'decimal')?.value ?? '.';

export const useNumberFormat = () => {
  return {
    groupSeperator,
    decimalSeperator,
    formatNumber: (value: number | bigint) => intl.format(value),
    formatNumberWithoutRemovingLeadingDecimalSeperator: (
      value: number | bigint
    ) => {
      const formattedValue = intl.format(value);
      if (value.toString().endsWith('.')) {
        return formattedValue + decimalSeperator;
      }
      if (value.toString().endsWith('.0')) {
        return formattedValue + decimalSeperator + '0';
      }

      if (value.toString().endsWith('.00')) {
        return formattedValue + decimalSeperator + '00';
      }

      return formattedValue;
    },
    parseNumber: (formattedValue: string) =>
      formattedValue
        .replaceAll(groupSeperator, '')
        .replaceAll(decimalSeperator, '.'),
    maximumFractionDigits: intl.resolvedOptions().maximumFractionDigits
  };
};
