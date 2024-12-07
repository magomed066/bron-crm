const generateError = (message = '') => {
	return {
		status: false,
		errors: [{ message }],
	}
}

export default generateError
