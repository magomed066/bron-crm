import compose from 'compose-function'
import { withRouter } from './with-router'
import { withMantine } from './with-mantine'
import withReactQuery from './with-react-query'

const withProviders = compose(withRouter, withReactQuery, withMantine)

export default withProviders
