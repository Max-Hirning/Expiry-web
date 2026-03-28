'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { X } from 'lucide-react';

import { cn } from 'shared/lib';

import { Button, Input } from './shadcn';

interface IProps {
  onChange: (values: string[]) => void;
  placeholder: string;
  values: string[];
  className?: string;
  'aria-invalid'?: boolean;
}

const MultiValueInput: FC<IProps> = ({
  className,
  values,
  placeholder,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isWrapped, setIsWrapped] = useState(false);
  const tagSavedRef = useRef(false);
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const id = requestAnimationFrame(() => {
      setIsWrapped(element.offsetHeight > 48);
    });

    return () => cancelAnimationFrame(id);
  }, [values]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex min-h-12 w-full flex-wrap items-center gap-1 border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring',
        isWrapped ? 'rounded-lg' : 'rounded-full',
      )}
    >
      {values.map((tag, index) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
        >
          {tag}
          <Button
            variant="ghost"
            type="button"
            onClick={() => onChange(values.toSpliced(index, 1))}
            className="h-fit p-0"
          >
            <X size={10} />
          </Button>
        </span>
      ))}
      <input
        placeholder={placeholder}
        ref={containerRef}
        className={cn(
          isWrapped ? 'rounded-lg' : 'rounded-full',
          props['aria-invalid']
            ? 'border-destructive focus-visible:ring-destructive'
            : 'focus-visible:ring-ring',
          className,
        )}
        value={inputValue}
        enterKeyHint="done"
        onChange={event => setInputValue(event.target.value)}
        onKeyDown={event => {
          if (event.key !== 'Enter') {
            return;
          }

          event.preventDefault();
          const trimmed = inputValue.trim();

          if (trimmed) {
            tagSavedRef.current = true;
            onChange([...values, trimmed]);
            setInputValue('');
          }
        }}
        onKeyUp={event => {
          if (event.key !== 'Enter') {
            return;
          }

          if (tagSavedRef.current) {
            tagSavedRef.current = false;

            return;
          }

          const trimmed = inputValue.trim();

          if (trimmed) {
            onChange([...values, trimmed]);
            setInputValue('');
          }
        }}
        {...props}
      />
    </div>
  );
};

export { MultiValueInput };
