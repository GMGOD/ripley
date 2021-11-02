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
	password: config.PASSWORD
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