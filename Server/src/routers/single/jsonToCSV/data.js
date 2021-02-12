const upload = require('../../../util/multer.util');
const converter = require('json-2-csv');

async function routes(fastify, options) {
	fastify.post('/single/jsonToCSV/data', async (request, reply) => {
		try {
			let data = request.body;

			await converter
				.json2csvAsync(data)
				.then((csv) => {
					reply
						.code(200)
						.header('Content-Type', 'text/csv')
						.header(
							'Content-disposition',
							`attachment; filename=file`
						)
						.send(csv);
				})
				.catch((err) => {
					reply.code(500).send('Error parsing file.');
				});
		} catch (error) {
			reply.code(400).send(error);
		}
	});
}

module.exports = routes;
