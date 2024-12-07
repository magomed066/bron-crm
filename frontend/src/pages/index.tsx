import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'
import { BaseLayout } from '@/app/layouts'
import { RequireAuth } from '@/shared/lib/hooks/require-auth'
import { LoadingOverlay } from '@mantine/core'

const Routing = () => {
	return (
		<Routes>
			<Route element={<BaseLayout />}>
				{privateRoutes.map(({ path, Component }) => (
					<Route
						key={path}
						path={path}
						element={
							<RequireAuth>
								<Suspense
									fallback={
										<LoadingOverlay
											visible={true}
											zIndex={1000}
											overlayProps={{ radius: 'sm' }}
										/>
									}
								>
									<Component />
								</Suspense>
							</RequireAuth>
						}
					/>
				))}
			</Route>

			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
		</Routes>
	)
}

export default Routing
