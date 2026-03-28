'use client';

import { FC } from 'react';

import { useDeleteDocument } from 'entities/document';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared/ui';

interface IProps {
  teamId: string;
  open: boolean;
  documentId: string;
  onOpenChange: (open: boolean) => void;
}

export const DocumentDeleteAlert: FC<IProps> = ({
  documentId,
  teamId,
  open,
  onOpenChange,
}) => {
  const { mutate: deleteDocument, isPending } = useDeleteDocument();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className="h-9">
            {isPending ? 'Deleting...' : 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={event => {
              event.preventDefault();
              deleteDocument(
                {
                  teamId,
                  documentId,
                },
                {
                  onSuccess: () => {
                    onOpenChange(false);
                  },
                },
              );
            }}
            variant="destructive"
            className="h-9"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
