'use client';

import { FC, ReactElement, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDocument } from 'entities/document';
import { useForm, UseFormReturn } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
} from 'shared/ui';

import {
  CreateDocumentInput,
  createDocumentSchema,
  UpdateDocumentInput,
} from '../../schemas';
import { DocumentForm } from '../form';

interface IProps {
  teamName: string;
  children: ReactElement;
}

export const CreateDocumentModal: FC<IProps> = ({ children, teamName }) => {
  const form = useForm<CreateDocumentInput>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      name: '',
      files: [],
      tags: [],
    },
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { mutate: createDocument, isPending } = useCreateDocument();

  const onSubmit = (value: CreateDocumentInput) => {
    //   createDocument(value);
    console.log(value);
  };

  return (
    <Dialog
      open={modalIsOpen}
      onOpenChange={open => {
        setModalIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Document for {teamName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="profile"
            className="flex w-full flex-wrap items-center justify-center gap-4"
          >
            <DocumentForm
              form={
                form as UseFormReturn<CreateDocumentInput | UpdateDocumentInput>
              }
            />
            <Button
              type="submit"
              isLoading={isPending}
              className="flex w-full items-center justify-center text-base"
            >
              Create Document
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
