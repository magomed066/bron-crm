import { VariantProps } from 'class-variance-authority'
import { ColumnDef } from '@tanstack/react-table'
import { table } from './config'
import { TableContextMenu } from '~/shared/lib/types'

type TableEl<T, K extends keyof T> = React.HTMLAttributes<HTMLTableElement> & {
  data: Array<T>
  columns: Array<ColumnDef<T, K>>
  selectRow?: (row: T) => void
  pagination?: boolean
  loadMore?: boolean
  onRowClick?: (row: T) => void
  onRowDoubleClick?: (row: T) => void
  rowContextMenu?: TableContextMenu<T>[]
}

export interface TableProps<T, K extends keyof T>
  extends TableEl<T, K>,
    VariantProps<typeof table> {}
