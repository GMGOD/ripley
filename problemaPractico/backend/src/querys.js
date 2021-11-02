let aurora = require('./common/aurora')
const mysql = require('./conn')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const graphqlFields = require('graphql-fields')

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

console.log('config query 🚀', config.AURORA_HOST)

exports.obtenerUsuario = async (_, { email }, context, info) => {

    let resp = await aurora.obtenerUsuario(mysql, email, graphqlFields(info))

    return resp

}