const mysql = require('mysql')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const basePath = path.join(path.resolve(process.cwd()), '/.env')

let envPath = ""
if (process.env.enviroment !== undefined) {
	envPath = path.normalize(basePath + '.' + process.env.enviroment.trim())
}

const finalPath = fs.existsSync(envPath) ? envPath : basePath
dotenv.config({ path: finalPath }).parsed

const config = {
	AURORA_HOST: process.env.AURORA_HOST,
	DB_NAME: process.env.DB_NAME,
	USERNAME: process.env.DB_USERNAME,
	PASSWORD: process.env.DB_PASSWORD,
	REGION: process.env.DB_REGION,
	DYNAMODB_BOLETA: process.env.DYNAMODB_BOLETA
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