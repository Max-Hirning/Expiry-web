'use client';

import { FC, useEffect, useRef, useState } from 'react';

import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { cn } from 'shared/lib';
import {
  Button,
  FileUpload,
  FormElement,
  FormField,
  Input,
  MultiValueInput,
} from 'shared/ui';

import { CreateDocumentInput, UpdateDocumentInput } from '../schemas/form';

interface IProps {
  form: UseFormReturn<CreateDocumentInput | UpdateDocumentInput>;
}

export const DocumentForm: FC<IProps> = ({ form }) => {
  // const [value, setValue] = useState('');
  // const [isWrapped, setIsWrapped] = useState(false);
  // const tagSavedRef = useRef(false);
  // const containerRef = useRef<HTMLDivElement>(null);
  // const tags = form.watch('tags');

  // useEffect(() => {
  //   const el = containerRef.current;

  //   if (!el) {
  //     return;
  //   }

  //   const id = requestAnimationFrame(() => {
  //     setIsWrapped(el.offsetHeight > 48);
  //   });

  //   return () => cancelAnimationFrame(id);
  // }, [tags]);

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormElement label="Document name" className="max-w-full">
            <Input {...field} placeholder="Enter your document name" />
          </FormElement>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormElement label="Document tags" className="max-w-full">
            <MultiValueInput
              onChange={field.onChange}
              placeholder="Enter tag name"
              values={field.value || []}
            />
            {/* <div
              ref={containerRef}
              className={cn(
                'flex min-h-12 w-full flex-wrap items-center gap-1 border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring',
                isWrapped ? 'rounded-lg' : 'rounded-full',
              )}
            >
              {(field.value ?? []).map((tag, index) => (
                <span
                  key={tag}
                  className="inline-flex gap-1 items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium"
                >
                  {tag}
                  <Button variant="ghost" type='button' onClick={() => field.onChange((field.value ?? []).toSpliced(index, 1))} className='p-0 h-fit'>
                    <X size={10} />
                  </Button>
                </span>
              ))}
              <input
                value={value}
                enterKeyHint="done"
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Enter tag name"
                onChange={event => setValue(event.target.value)}
                onKeyDown={event => {
                  if (event.key !== 'Enter') {
                    return;
                  }

                  event.preventDefault();
                  const trimmed = value.trim();

                  if (trimmed) {
                    tagSavedRef.current = true;
                    field.onChange([...(field.value ?? []), trimmed]);
                    setValue('');
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

                  const trimmed = value.trim();

                  if (trimmed) {
                    field.onChange([...(field.value ?? []), trimmed]);
                    setValue('');
                  }
                }}
              />
            </div> */}
          </FormElement>
        )}
      />
      <FormField
        control={form.control}
        name="files"
        render={({ field }) => (
          <FormElement label="Document files" className="max-w-full">
            <FileUpload
              value={field.value || []}
              onChange={field.onChange}
              description="JPEG, JPG, PNG, PDF formats only"
              multiple
              accept="image/png, image/jpeg, image/jpg, application/pdf"
            />
          </FormElement>
        )}
      />
    </>
  );
};
