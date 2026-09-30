export interface Document {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tagName: string;
  folderName: string;
  originalFilename: string;
  extension: string;
  size: number;
  documentType: number;
  mimeType: number;
  activity: any;
}
