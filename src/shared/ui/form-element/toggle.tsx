import { FC } from 'react';

import { Switch } from '../shadcn';

interface IProps {
  label: string;
  description: string;
  disabled?: boolean;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const ToggleFormElement: FC<IProps> = ({
  label,
  disabled,
  description,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex w-full items-center justify-between pr-4">
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-medium leading-none text-foreground">{label}</p>
        <p className="leading-5 text-muted-foreground">{description}</p>
      </div>
      <Switch
        disabled={disabled}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};
