const multer = require('fastify-multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'cache/incoming/');
	},
	filename: function(req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, file.fieldname + '-' + uniqueSuffix);
	}
});

const upload = multer({ storage: storage });

async function routes(fastify, options) {
	fastify.post(
		'/single/jsonToCSV/file',
		{ preHandler: upload.single('json') },
		async (request, reply) => {
			console.log(request.file);
			let fileName = request.file.filename;
			reply.code(200).send('SUCCESS!');
		}
	);
}

module.exports = routes;
