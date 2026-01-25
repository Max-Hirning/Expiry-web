import * as React from 'react';

import { Eye, EyeOff, KeyRound, Mail, Search } from 'lucide-react';

import { cn } from 'shared/lib';

import { Button } from './button';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = showPassword ? 'text' : 'password';

    const togglePasswordVisibility = () => setShowPassword(state => !state);

    return (
      <div className="relative">
        <Search
          size={16}
          className={cn(
            type !== 'search' && 'hidden',
            'absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]',
          )}
        />
        <Mail
          size={16}
          className={cn(
            type !== 'email' && 'hidden',
            'absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]',
          )}
        />
        <KeyRound
          size={16}
          className={cn(
            type !== 'password' && 'hidden',
            'absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]',
          )}
        />
        <input
          type={type === 'password' ? isPassword : type}
          className={cn(
            'flex h-12 w-full rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            (type !== 'password' || type !== 'email') && 'pl-9',
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <Button
            onClick={togglePasswordVisibility}
            variant="ghost"
            type="button"
            className="absolute right-3 top-1/2 h-fit w-fit -translate-y-1/2 transform p-0"
          >
            {showPassword ? (
              <EyeOff
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A]"
              />
            ) : (
              <Eye
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A]"
              />
            )}
          </Button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
