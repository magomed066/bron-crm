import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const client = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 10,
		},
	},
})

const withReactQuery = (component: () => ReactNode) => () => {
	return (
		<QueryClientProvider client={client}>{component()}</QueryClientProvider>
	)
}

export default withReactQuery
