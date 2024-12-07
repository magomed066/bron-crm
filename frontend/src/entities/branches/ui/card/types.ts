import { Branch } from '@/shared/api/services'
import { ReactElement } from 'react'

export type Props = {
	branch: Branch
	actions?: ReactElement[]
}
