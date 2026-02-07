'use client';

import { FC } from 'react';

import { useDeleteTeam } from 'entities/team';

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
  onOpenChange: (open: boolean) => void;
}

export const TeamDeleteAlert: FC<IProps> = ({ teamId, open, onOpenChange }) => {
  const { mutate: deleteTeam, isPending } = useDeleteTeam();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your team
            from our servers.
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
              deleteTeam(teamId, {
                onSuccess: () => {
                  onOpenChange(false);
                },
              });
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
