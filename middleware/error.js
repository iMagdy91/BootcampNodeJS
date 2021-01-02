const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (error, req, res, next) => {
	let err = { ...error };
	err.message = error.message;

	// Log to console for dev
	console.log(err);

	// Mongoose bad objectId
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		err = new ErrorResponse(message, 404);
	}

	// Mongoose duplicate key
	if (err.code === 11000) {
		const message = 'Duplicate field value entered';
		err = new ErrorResponse(message, 400);
	}

	// Mongoose validation errors
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
	}

	res.status(err.statusCode || 500).json({
		success: false,
		error: err.message || 'Server Error'
	});
};

module.exports = errorHandler;
