import {TableColumn} from '../classes/table.class';

export const LibraryColumns: TableColumn<any>[] = [
  {
    id: '1',
    label: 'DOCUMENTO',
    field: 'title',
    type: 'text',
    sortable: true,
  },
  {
    id: '2',
    label: 'CARPETA',
    field: 'folderName',
    type: 'text',
  },
  {
    id: '3',
    label: 'ETIQUETAS',
    field: 'tagName',
    type: 'text',
  },
  {
    id: '4',
    label: 'ACTUALIZADO',
    field: 'updatedAt',
    type: 'text',
  },
];
