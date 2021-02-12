const upload = require('../../../util/multer.util');
const fs = require('fs');
const converter = require('json-2-csv');

async function routes(fastify, options) {
	fastify.addHook('onResponse', async (request, reply) => {
		try {
			fs.unlinkSync(request.file.path);
		} catch (err) {
			console.error(err);
		}
	});

	fastify.post(
		'/single/jsonToCSV/file',
		{ preHandler: upload.single('json') },
		async (request, reply) => {
			const data = fs.readFileSync(`${request.file.path}`);
			let json = JSON.parse(data);
			let fileName = `${request.file.originalname.split('.')[0]}.csv`;

			await converter
				.json2csvAsync(json)
				.then((csv) => {
					reply
						.code(200)
						.header('Content-Type', 'text/csv')
						.header(
							'Content-disposition',
							`attachment; filename=${fileName}`
						)
						.send(csv);
				})
				.catch((err) => {
					reply.code(500).send('Error parsing file.');
				});
		}
	);
}

module.exports = routes;
