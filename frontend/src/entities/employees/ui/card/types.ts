import { Employee } from '@/shared/api/services'
import { ReactNode } from 'react'

export type Props = {
	data: Employee
	editAction?: ReactNode
}
