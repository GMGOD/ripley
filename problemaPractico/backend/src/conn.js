const mysql = require('mysql')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(path.resolve(process.cwd()), '/.env') }).parsed

const config = {
	AURORA_HOST: process.env.AURORA_HOST,
	DB_NAME: process.env.DB_NAME,
	USERNAME: process.env.DB_USERNAME,
	PASSWORD: process.env.DB_PASSWORD,
	REGION: process.env.DB_REGION
}

const pool = mysql.createPool({
	host: config.AURORA_HOST,
	database: config.DB_NAME,
	user: config.USERNAME,
	password: config.PASSWORD,
	typeCast: function castField(field, useDefaultTypeCasting) {
		//https://www.bennadel.com/blog/3188-casting-bit-fields-to-booleans-using-the-node-js-mysql-driver.htm
		// We only want to cast bit fields that have a single-bit in them. If the field
		// has more than one bit, then we cannot assume it is supposed to be a Boolean.
		if ((field.type === "BIT") && (field.length === 1)) {

			var bytes = field.buffer();

			// A Buffer in Node represents a collection of 8-bit unsigned integers.
			// Therefore, our single "bit field" comes back as the bits '0000 0001',
			// which is equivalent to the number 1.
			return (bytes[0] === 1);

		}

		return (useDefaultTypeCasting());

	}
})

pool.on('connection', function (connection) {
	console.log('Graphql connected to DBO 🚀')
});

console.log('config conn 🚀', config.AURORA_HOST)

const conn = {
	query: (query, params) => new Promise((resolve, reject) => pool.query(query, params, (error, results, fields) => {
		if (error) return reject(error)
		// console.log("HOLA!",results, fields);
		return resolve(results)
	})).then(r => {

		return r
	})
}

module.exports = conn