export enum MfaTypes {
  CUSTOM = 'CUSTOM',
}

export enum UserRoles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SUB_ADMIN = 'SUB_ADMIN',
  USER = 'USER',
}

export enum UserStatuses {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
  INVITED = 'INVITED',
}

export enum TeamMemberRoles {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

export enum NotificationTypes {
  INVITE_USER_IN_TEAM = 'INVITE_USER_IN_TEAM',
  DELETE_USER_FROM_TEAM = 'DELETE_USER_FROM_TEAM',

  DELETE_DOCUMENT = 'DELETE_DOCUMENT',

  DELETE_TEAM = 'DELETE_TEAM',
}

export enum DocumentStatuses {
  PROCESSING = 'PROCESSING',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  FAILED = 'FAILED',
  NEEDS_REVIEW = 'NEEDS_REVIEW',
}

export enum RiskLevels {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum ExtractedFieldTypes {
  EXPIRY_DATE = 'EXPIRY_DATE',
  ISSUE_DATE = 'ISSUE_DATE',
  COUNTERPARTY = 'COUNTERPARTY',
  AMOUNT = 'AMOUNT',
}

export enum ExtractedFieldSource {
  OCR = 'OCR',
  REGEX = 'REGEX',
  MANUAL = 'MANUAL',
}

export enum ActionLogTypes {
  CREATE_TEAM = 'CREATE_TEAM',
  UPDATE_TEAM = 'UPDATE_TEAM',

  ADD_USER = 'ADD_USER',
  INVITE_USER = 'INVITE_USER',
  DELETE_USER = 'DELETE_USER',
  DELETE_HIMSELF = 'DELETE_HIMSELF',

  CREATE_DOCUMENT = 'CREATE_DOCUMENT',
  UPDATE_DOCUMENT = 'UPDATE_DOCUMENT',
  DELETE_DOCUMENT = 'DELETE_DOCUMENT',
}

export enum ChatMemberStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
}
