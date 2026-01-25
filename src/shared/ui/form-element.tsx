import { FC, ReactElement } from 'react';

import { cn } from 'shared/lib';

import { FormControl, FormItem, FormLabel, FormMessage } from './shadcn';

interface IProps {
  label?: string | ReactElement;
  children: ReactElement;
  className?: string;
  labelClassName?: string;
}

export const FormElement: FC<IProps> = ({
  className,
  label,
  children,
  labelClassName,
}) => {
  return (
    <FormItem
      className={cn(
        'flex w-full max-w-[400px] flex-col gap-2 space-y-0',
        className,
      )}
    >
      <FormLabel
        className={cn(
          'body-m text-neutral-500',
          !label && 'hidden',
          labelClassName,
        )}
      >
        {label}
      </FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
};
