const upload = require('../../../util/multer.util');
const converter = require('json-2-csv');
const fetch = require('node-fetch');

async function routes(fastify, options) {
	fastify.post('/single/jsonToCSV/api', async (request, reply) => {
		try {
			let url = request.body.api;
			let data;

			await fetch(url)
				.then((res) => res.json())
				.then((text) => (data = text))
				.catch((err) => console.log(err));

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
