import React from 'react';

interface ListProps<T> {
  items: T[];
  render: (item: T) => JSX.Element;
}

export function List<T>(
  props: ListProps<T> & React.ComponentPropsWithoutRef<'ul'>,
) {
  const { items, render, ...ulProps } = props;

  return <ul {...ulProps}>{items.map((item) => render(item))}</ul>;
}
