const multer = require('fastify-multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'cache/incoming/');
	},
	filename: function(req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + '-' + file.originalname);
	}
});

const upload = multer({ storage: storage });

module.exports = upload;
