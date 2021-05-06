const fastify = require('fastify')({
	logger: true
});

fastify.register(require('fastify-cors'), { 
	// put your options here
  })

const multer = require('fastify-multer');
const upload = multer({ dest: 'cache/incoming/' });
fastify.register(multer.contentParser); //Make sure you load multer related files way before router files

fastify.register(require('./routers/single/jsonToCSV/file'));
fastify.register(require('./routers/single/jsonToCSV/data'));
fastify.register(require('./routers/single/jsonToCSV/api'));

fastify.get('/', async (request, reply) => {
	return { hello: 'world' };
});

const start = async () => {
	try {
		await fastify.listen(5000);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
