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
