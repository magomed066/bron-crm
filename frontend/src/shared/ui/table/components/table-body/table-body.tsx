import { flexRender } from '@tanstack/react-table'
import { TableBodyProps } from './types'
import { tableHead } from './config'

export function TableBody<T>({
  className,
  data,
  onRowClick,
  onRowContextMenu,
  onRowDoubleClick,
}: TableBodyProps<T>) {
  return (
    <tbody className={tableHead({ className })}>
      {data.map((row) => (
        <tr
          onClick={() => onRowClick?.(row.original)}
          onDoubleClick={() => onRowDoubleClick?.(row.original)}
          onContextMenu={(e) => onRowContextMenu?.(e, row.original)}
          key={row.id}
          className="hover:bg-slate-200 cursor-pointer transition-all bg-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap dark:text-white"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
