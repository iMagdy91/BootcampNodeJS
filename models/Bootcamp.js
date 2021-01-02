const mongoose = require('mongoose');
const slugify = require('slugify');

const BootcampSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
		unique: true,
		trim: true,
		maxlength: [50, 'Name cannot be more than 50 characters']
	},
	slug: String,
	description: {
		type: String,
		required: [true, 'Please add a description'],
		maxlength: [500, 'Description cannot be more than 500 characters']
	},
	website: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'Please add a valid URL with http or https'
		]
	},
	phone: {
		type: String,
		maxlength: [20, 'Phone number cannot be more than 50 characters']
	},
	email: {
		type: String,
		match: [/\S+@\S+\.\S+/, 'Please add a valid email']
	},
	address: {
		type: String,
		required: [true, 'Please add an address']
	},
	location: {
		// GeoJSON Point
		type: {
			type: String,
			enum: ['Point'],
			required: false
		},
		coordinates: {
			type: [Number],
			required: false,
			index: '2dsphere'
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String
	},
	careers: {
		// Array of Strings
		type: [String],
		required: true,
		enum: [
			'Web Development',
			'Mobile Development',
			'UI/UX',
			'Data Science',
			'Business',
			'Other'
		]
	},
	averageRating: {
		type: Number,
		min: [1, 'Rating must be at least 1'],
		max: [10, 'Rating cannot be more than 10']
	},
	averageCost: Number,
	photo: {
		type: String,
		default: 'no-photo.jpg'
	},
	housing: {
		type: Boolean,
		default: false
	},
	jobAssistance: {
		type: Boolean,
		default: false
	},
	jobGurantee: {
		type: Boolean,
		default: false
	},
	acceptGi: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Create bootcamp slug from name
BootcampSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});
module.exports = mongoose.model('Bootcamp', BootcampSchema);
