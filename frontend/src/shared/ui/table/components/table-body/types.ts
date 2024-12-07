import { VariantProps } from 'class-variance-authority'
import { Row } from '@tanstack/react-table'
import { tableHead } from './config'

type TableBodyEl<T> = React.HTMLAttributes<HTMLTableElement> & {
  data: Array<Row<T>>
  onRowClick?: (row: T) => void
  onRowDoubleClick?: (row: T) => void
  onRowContextMenu?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: T,
  ) => void
}

export interface TableBodyProps<T>
  extends TableBodyEl<T>,
    VariantProps<typeof tableHead> {}
