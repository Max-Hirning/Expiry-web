'use client';

import * as React from 'react';
import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Check, Eye, EyeOff, KeyRound, Mail, Search, X } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';

import { PASSWORD_MIN_LENGTH, PHONE_NUMBER_MAX_LENGTH } from 'shared/constants';
import { cn } from 'shared/lib';

import { Button } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export const PHONE_NUMBER_COUNTRIES = {
  US: { code: 'US', name: 'United States', dialCode: '+1' },
  CA: { code: 'CA', name: 'Canada', dialCode: '+1' },
  GB: { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  DE: { code: 'DE', name: 'Germany', dialCode: '+49' },
  FR: { code: 'FR', name: 'France', dialCode: '+33' },
  IT: { code: 'IT', name: 'Italy', dialCode: '+39' },
  ES: { code: 'ES', name: 'Spain', dialCode: '+34' },
  JP: { code: 'JP', name: 'Japan', dialCode: '+81' },
  CN: { code: 'CN', name: 'China', dialCode: '+86' },
  IN: { code: 'IN', name: 'India', dialCode: '+91' },
  BR: { code: 'BR', name: 'Brazil', dialCode: '+55' },
  AU: { code: 'AU', name: 'Australia', dialCode: '+61' },
  RU: { code: 'RU', name: 'Russia', dialCode: '+7' },
  KR: { code: 'KR', name: 'South Korea', dialCode: '+82' },
  MX: { code: 'MX', name: 'Mexico', dialCode: '+52' },
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    hidePasswordStrengthChecker?: boolean;
    containerClassName?: string;
  }
>(
  (
    {
      className,
      value,
      containerClassName,
      hidePasswordStrengthChecker,
      type,
      placeholder,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [contentWidth, setContentWidth] = useState<number>();
    const [showPassword, setShowPassword] = React.useState(false);
    const [phoneNumberCountry, setPhoneNumberCountry] = React.useState<
      (typeof PHONE_NUMBER_COUNTRIES)['US']
    >(PHONE_NUMBER_COUNTRIES.US);
    const isPassword = showPassword ? 'text' : 'password';

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (!inputRef.current) {
        return;
      }

      const element = inputRef.current;

      const observer = new ResizeObserver(([entry]) => {
        const { width } = entry.target.getBoundingClientRect();

        setContentWidth(width);
      });

      observer.observe(element);

      return () => {
        observer.unobserve(element);
        observer.disconnect();
      };
    }, [inputRef.current]);

    const togglePasswordVisibility = () => setShowPassword(state => !state);

    const constructPlaceholder = () => {
      if (type === 'tel') {
        return `${phoneNumberCountry.dialCode}${placeholder}`;
      }

      return placeholder;
    };

    return (
      <>
        <div className={cn('relative', containerClassName)}>
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
          <Select
            value={phoneNumberCountry.code}
            onValueChange={code => {
              const countryCode = code as keyof typeof PHONE_NUMBER_COUNTRIES;
              const selectedCountry = PHONE_NUMBER_COUNTRIES[countryCode];

              if (selectedCountry) {
                if (onChange && typeof value === 'string') {
                  const nextValue = value.replace(
                    phoneNumberCountry.dialCode,
                    selectedCountry.dialCode,
                  );

                  onChange({
                    target: {
                      value: nextValue,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }

                setPhoneNumberCountry(selectedCountry);
              }
            }}
          >
            <SelectTrigger
              className={cn(
                'absolute flex h-12 w-[76px] items-center justify-between rounded-none rounded-l-full border border-input bg-[#F5F5F4] px-4 py-0',
                type !== 'tel' && 'hidden',
              )}
            >
              <SelectValue>
                <ReactCountryFlag
                  svg
                  countryCode={phoneNumberCountry.code}
                  className="h-6 w-6 rounded-full object-cover"
                />
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              style={{
                width: `${contentWidth}px`,
              }}
            >
              {Object.values(PHONE_NUMBER_COUNTRIES).map(
                ({ code, name, dialCode }) => (
                  <SelectItem key={code} value={code}>
                    <span className="flex flex-row items-center justify-start gap-2 text-sm font-normal">
                      <ReactCountryFlag
                        svg
                        countryCode={code}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="flex-1">{name}</span>
                      {dialCode}
                    </span>
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
          <input
            type={type === 'password' ? isPassword : type}
            placeholder={constructPlaceholder()}
            className={cn(
              'flex h-12 w-full rounded-full border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              (type === 'password' || type === 'email' || type === 'search') &&
                'pl-9',
              type === 'tel' && 'pl-[85px]',
              props['aria-invalid']
                ? 'border-destructive focus-visible:ring-destructive'
                : 'focus-visible:ring-ring',
              className,
            )}
            ref={inputRef}
            onChange={event => {
              if (type === 'tel') {
                let val = event.target.value;

                // Allow only digits and "+"
                val = val.replace(/[^+\d]/g, '');

                // Ensure phonePrefix is at the start
                if (!val.startsWith(phoneNumberCountry.dialCode)) {
                  const prefixRegex = new RegExp(
                    `^\\${phoneNumberCountry.dialCode}?`,
                  );

                  val = `${phoneNumberCountry.dialCode}${val.replace(prefixRegex, '')}`;
                }

                event.target.value = val;
              }
              if (onChange) {
                onChange(event);
              }
            }}
            value={value}
            maxLength={
              type === 'tel'
                ? PHONE_NUMBER_MAX_LENGTH + phoneNumberCountry.dialCode.length
                : undefined
            }
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
        {type === 'password' &&
          typeof value === 'string' &&
          !hidePasswordStrengthChecker && (
            <>
              <span
                className={cn(
                  'flex flex-row items-center gap-2 text-sm font-normal',
                  value.length >= PASSWORD_MIN_LENGTH
                    ? 'text-green-500'
                    : 'text-gray-500',
                )}
              >
                <X
                  className={cn(
                    value.length >= PASSWORD_MIN_LENGTH && 'hidden',
                  )}
                  size={16}
                />
                <Check
                  className={cn(value.length < PASSWORD_MIN_LENGTH && 'hidden')}
                  size={16}
                />
                At least 8 characters
              </span>
              <span
                className={cn(
                  'flex flex-row items-center gap-2 text-sm font-normal',
                  /\d/.test(value) ? 'text-green-500' : 'text-gray-500',
                )}
              >
                <X className={cn(/\d/.test(value) && 'hidden')} size={16} />
                <Check
                  className={cn(!/\d/.test(value) && 'hidden')}
                  size={16}
                />
                At least 1 number
              </span>
              <span
                className={cn(
                  'flex flex-row items-center gap-2 text-sm font-normal',
                  /[a-zA-Z]/.test(value) ? 'text-green-500' : 'text-gray-500',
                )}
              >
                <X
                  className={cn(/[a-zA-Z]/.test(value) && 'hidden')}
                  size={16}
                />
                <Check
                  className={cn(!/[a-zA-Z]/.test(value) && 'hidden')}
                  size={16}
                />
                At least 1 letter
              </span>
            </>
          )}
      </>
    );
  },
);

Input.displayName = 'Input';

export { Input };
