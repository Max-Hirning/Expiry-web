'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateTeam } from 'entities/team';
import { useForm } from 'react-hook-form';

import { TeamMemberRoles } from 'shared/types';
import { Button, Form } from 'shared/ui';

import { CreateTeamInput, createTeamSchema } from '../../schemas';
import { TeamForm } from './form';

export const CreateTeamForm = () => {
  const { push } = useRouter();
  const form = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      name: '',
      teamMembers: [
        {
          userId: crypto.randomUUID(),
          role: TeamMemberRoles.STAFF,
          fullName: '',
        },
      ],
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { mutate: createTeam, isPending } = useCreateTeam();

  const onSubmit = (value: CreateTeamInput) => {
    createTeam(
      {
        name: value.name,
        // ...(value.logo && {
        //     logo: {
        //       mimeType: value.logo.type,
        //       width: value.logo.width,
        //       height: value.logo.height,
        //       fileSize: value.logo.size,
        //     }
        //   })
      },
      {
        onSuccess: () => {
          push('/');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="profile"
        className="flex w-full max-w-lg flex-wrap items-center justify-center gap-4"
      >
        <TeamForm form={form} />
        <Button
          type="submit"
          isLoading={isPending}
          className="flex w-full items-center justify-center text-base"
        >
          Create Team
        </Button>
      </form>
    </Form>
  );
};
