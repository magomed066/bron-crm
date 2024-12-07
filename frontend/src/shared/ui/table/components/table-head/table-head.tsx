import { flexRender } from '@tanstack/react-table'
import { TableHeadProps } from './types'
import { tableHead } from './config'

export function TableHead<T>({ className, columns = [] }: TableHeadProps<T>) {
  return (
    <thead className={tableHead({ className })}>
      {columns.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{ width: header.getSize() }}
              scope="col"
              className="px-6 py-5 text-xs font-bold text-left uppercase "
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
