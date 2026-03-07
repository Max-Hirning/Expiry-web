import React, { FC, ReactElement } from 'react';

import { X } from 'lucide-react';

import { cn } from 'shared/lib';

import { Button } from './shadcn';

interface IProps {
  selectedAmount: number;
  totalAmount: number;
  className?: string;
  onResetAction: () => void;
  children: ReactElement[];
}

const childrenWithSeparators = (children: React.ReactNode) => {
  const items = React.Children.toArray(children);

  return items.map((child, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <React.Fragment key={index}>
      {index > 0 && <div className="mx-2 h-auto w-px bg-gray-500" />}
      {child}
    </React.Fragment>
  ));
};

export const BulkMenu: FC<IProps> = ({
  selectedAmount,
  totalAmount,
  className,
  onResetAction,
  children,
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-3 left-1/2 flex -translate-x-1/2 rounded-full bg-black p-1 pl-4',
        selectedAmount === 0 && 'hidden',
        className,
      )}
    >
      {childrenWithSeparators([
        <div key="counter" className="flex items-center gap-2">
          <p className="text-sm text-gray-400">
            <span className="text-white">{selectedAmount}</span> of{' '}
            <span className="text-white">{totalAmount}</span>
          </p>
          <Button
            onClick={onResetAction}
            className="h-4 w-4 p-0 text-white"
            variant="link"
          >
            <X />
          </Button>
        </div>,
        ...children,
      ])}
    </div>
  );
};
