import React from 'react';
import { FunctionComponent } from 'react';

interface Props {
  value?: number;
  currency?: string;
  locale?: string;
}

export const CurrencyFormatter: FunctionComponent<Props> = ({
  value,
  currency = 'UGX',
  locale = 'en-UG',
}) => {
  if (value === undefined) {
    return null;
  }
  const nf = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

  return <>{nf.format(value)}</>;
};
