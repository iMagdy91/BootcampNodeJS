const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (error, req, res, next) => {
	let err = { ...error };
	err.message = error.message;

	// Log to console for dev
	console.log(error);

	// Mongoose bad objectId
	if (error.name === 'CastError') {
		const message = `Resource not found with id of ${error.value}`;
		err = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (error.code === 11000) {
		const message = 'Duplicate field value entered';
		err = new ErrorResponse(message, 400);
	}

	// Mongoose validation errors
	if (error.name === 'ValidationError') {
		const message = Object.values(error.errors).map((val) => val.message);
		err = new ErrorResponse(message, 400);
	}

	res.status(err.statusCode || 500).json({
		success: false,
		error: err.message || 'Server Error'
	});
};

module.exports = errorHandler;
