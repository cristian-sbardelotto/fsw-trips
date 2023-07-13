type useFormattedNumberProps = {
  number: number;
  locale: string;
  currency: string;
};

export function useFormattedNumber({
  number,
  locale,
  currency,
}: useFormattedNumberProps) {
  return number.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}
