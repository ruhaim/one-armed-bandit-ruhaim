import * as React from 'react';

export default function CurrencyDisplay({ value }) {
  const currencyFormatter = React.useRef(
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  );
  return <span>{currencyFormatter.current.format(value)}</span>;
}
