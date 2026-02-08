'use client';

import { FC } from 'react';

import { Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { TeamMemberRoles } from 'shared/types';
import { Button, FileUpload, FormElement, FormField, Input } from 'shared/ui';

import { CreateTeamInput } from '../../schemas';
import { TeamMemberForm } from './team-member';

interface IProps {
  form: UseFormReturn<CreateTeamInput>;
  defaultValues?: Partial<CreateTeamInput>;
}

export const TeamForm: FC<IProps> = ({ form, defaultValues }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormElement label="Team Name" className="max-w-full">
            <Input
              {...field}
              value={field.value || defaultValues?.name || ''}
              placeholder="Team 1"
            />
          </FormElement>
        )}
      />
      <FormField
        control={form.control}
        name="logo"
        render={({ field }) => (
          <FormElement label="Team Logo" className="max-w-full">
            <FileUpload
              multiple={false}
              accept="image/jpeg,image/png"
              onChange={([file]) => {
                if (file) {
                  field.onChange(file);
                }
              }}
              value={field.value ? [field.value] : []}
            />
          </FormElement>
        )}
      />
      <FormField
        control={form.control}
        name="teamMembers"
        render={({ field }) => {
          const value = field.value || defaultValues?.teamMembers || [];

          return (
            <FormElement
              label="Assignees"
              className="flex max-w-full flex-col items-start justify-start gap-2"
            >
              <>
                {value.map((assignee, index) => (
                  <TeamMemberForm
                    key={`${assignee.userId}-${assignee.role}`}
                    assignee={assignee}
                    value={value}
                    onChange={field.onChange}
                    index={index}
                  />
                ))}
                <Button
                  variant="link"
                  type="button"
                  className="flex h-fit items-center gap-2 p-0"
                  onClick={() => {
                    field.onChange([
                      ...field.value,
                      {
                        userId: crypto.randomUUID(),
                        role: TeamMemberRoles.STAFF,
                        fullName: '',
                      },
                    ]);
                  }}
                >
                  <Plus />
                  Add Assignees
                </Button>
              </>
            </FormElement>
          );
        }}
      />
    </>
  );
};
