import * as React from 'react';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export default function CurrencyDisplay({ value }) {
  return <span>{currencyFormatter.format(value)}</span>;
}
