import { ChatAiAgentVisibility } from 'shared/types';

export interface ISendMessage {
  message: string;
  parentMessageId?: string;
}

export interface IEditMessage {
  message: string;
}

export interface IMarkMessagesRead {
  messageIds: string[];
}

export interface IUpdateChat {
  name?: string;
  aiAgentEnabled?: boolean;
  aiAgentVisibility?: ChatAiAgentVisibility;
}
