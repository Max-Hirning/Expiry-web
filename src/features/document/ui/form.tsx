'use client';

import { FC } from 'react';

import { UseFormReturn } from 'react-hook-form';

import { FileUpload, FormElement, FormField, Input } from 'shared/ui';

import { CreateDocumentInput, UpdateDocumentInput } from '../schemas/form';

interface IProps {
  form: UseFormReturn<CreateDocumentInput | UpdateDocumentInput>;
}

export const DocumentForm: FC<IProps> = ({ form }) => {
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
            <Input {...field} type="email" placeholder="Enter your email" />
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
