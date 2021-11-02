let aurora = require('./common/aurora')
const mysql = require('./conn')
const dotenv = require('dotenv')
const path = require('path')
const graphqlFields = require('graphql-fields')

dotenv.config({ path: path.join(path.resolve(process.cwd()), '/.env') }).parsed

const config = {
    AURORA_HOST: process.env.AURORA_HOST,
    DB_NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    REGION: process.env.DB_REGION
}

console.log('config query 🚀', config.AURORA_HOST)

exports.obtenerUsuario = async (_, { email }, context, info) => {

    let resp = await aurora.obtenerUsuario(mysql, email, graphqlFields(info))

    return resp

}

exports.obtenerTodosLosUsuarios = async (_, { email }, context, info) => {

    let resp = await aurora.obtenerTodosLosUsuarios(mysql, graphqlFields(info))

    return resp

}