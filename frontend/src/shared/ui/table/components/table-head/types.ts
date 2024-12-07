import { VariantProps } from 'class-variance-authority'
import { HeaderGroup } from '@tanstack/react-table'
import { tableHead } from './config'

type TableHeadEl<T> = React.HTMLAttributes<HTMLTableElement> & {
  columns: Array<HeaderGroup<T>>
}

export interface TableHeadProps<T>
  extends TableHeadEl<T>,
    VariantProps<typeof tableHead> {}
