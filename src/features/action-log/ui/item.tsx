'use client';

import { format } from 'date-fns';
import { IAvatar } from 'entities/user';

import { ActionLogTypes } from 'shared/types';
import { UserAvatar } from 'shared/ui';

import { IActionLog } from '../../../entities/action-log/types';

interface ActionLogItemProps {
  actionLog: IActionLog;
  isFirst: boolean;
  isLast: boolean;
}

const actionDescriptions: Record<
  ActionLogTypes,
  (log: IActionLog) => { verb: string; subject: string | null }
> = {
  [ActionLogTypes.CREATE_TEAM]: () => ({
    verb: 'created the team',
    subject: null,
  }),
  [ActionLogTypes.UPDATE_TEAM]: () => ({
    verb: 'updated the team',
    subject: null,
  }),
  [ActionLogTypes.ADD_USER]: log => ({
    verb: 'added',
    subject: log.userFullName,
  }),
  [ActionLogTypes.INVITE_USER]: log => ({
    verb: 'invited',
    subject: log.userFullName,
  }),
  [ActionLogTypes.DELETE_USER]: log => ({
    verb: 'removed',
    subject: log.userFullName,
  }),
  [ActionLogTypes.DELETE_HIMSELF]: () => ({
    verb: 'left the team',
    subject: null,
  }),
  [ActionLogTypes.CREATE_DOCUMENT]: log => ({
    verb: 'created',
    subject: log.documentName,
  }),
  [ActionLogTypes.UPDATE_DOCUMENT]: log => ({
    verb: 'updated',
    subject: log.documentName,
  }),
  [ActionLogTypes.DELETE_DOCUMENT]: log => ({
    verb: 'deleted',
    subject: log.documentName,
  }),
};

export const ActionLogItem = ({
  actionLog,
  isFirst,
  isLast,
}: ActionLogItemProps) => {
  const { verb, subject } = actionDescriptions[actionLog.type](actionLog);

  return (
    <article className="flex gap-4">
      <aside className="flex w-4 flex-col items-center">
        <div
          className={`w-0.5 flex-1 ${isFirst ? 'invisible' : ''}`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, #d4d4d8 0px, #d4d4d8 5px, transparent 5px, transparent 13px)',
          }}
        />
        <div className="size-2 shrink-0 rounded-full bg-zinc-400" />
        <div
          className={`w-0.5 flex-1 ${isLast ? 'invisible' : ''}`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, #d4d4d8 0px, #d4d4d8 5px, transparent 5px, transparent 13px)',
          }}
        />
      </aside>

      <section className="flex items-center gap-2 py-3">
        <UserAvatar
          avatar={
            actionLog.actorAvatarUrl
              ? ({ url: actionLog.actorAvatarUrl } as IAvatar)
              : null
          }
          fullName={actionLog.actorFullName}
          isOnline={false}
          className="size-8"
          classNameOnlineBadge="hidden"
        />

        <article className="flex flex-col gap-1.5">
          <p className="flex flex-wrap items-center gap-1.5 text-sm leading-5">
            <strong className="font-semibold text-zinc-900">
              {actionLog.actorFullName}
            </strong>
            <span className="text-zinc-500">{verb}</span>
            {subject && (
              <mark className="max-w-[200px] truncate bg-transparent font-medium text-zinc-900 underline decoration-dotted underline-offset-2">
                {subject}
              </mark>
            )}
          </p>
          <time
            dateTime={actionLog.createdAt}
            className="text-xs text-zinc-500"
          >
            {format(new Date(actionLog.createdAt), 'MMM d, yyyy, hh:mm a')}
          </time>
        </article>
      </section>
    </article>
  );
};
