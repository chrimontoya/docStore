export const DOCUMENT_STATUS = {
  ACTIVE: 'ACTIVE',
  TRASH: 'TRASH',
}

export type DocumentStatus = typeof DOCUMENT_STATUS[keyof typeof DOCUMENT_STATUS];
