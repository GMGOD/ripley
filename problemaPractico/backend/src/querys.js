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

exports.obtenerTodasMisInversiones = async (_, { email }, context, info) => {

    let resp = await aurora.obtenerTodasMisInversiones(mysql, email, graphqlFields(info))

    return resp

}

exports.obtenerInstrumentos = async (_, { }, context, info) => {

    let resp = await aurora.obtenerInstrumentos(mysql, graphqlFields(info))

    return resp

}

exports.obtenerInstrumento = async (_, { idInstrumento }, context, info) => {

    let resp = await aurora.obtenerInstrumento(mysql, idInstrumento, graphqlFields(info))

    return resp

}

exports.obtenerInversiones = async (_, { email }, context, info) => {

    let resp = await aurora.obtenerInversiones(mysql, email, graphqlFields(info))

    return resp

}

exports.obtenerInversion = async (_, { idInversion }, context, info) => {

    let resp = await aurora.obtenerInversion(mysql, idInversion, graphqlFields(info))

    return resp

}

exports.obtenerCartera = async (_, { idCartera }, context, info) => {

    let resp = await aurora.obtenerCartera(mysql, idCartera, graphqlFields(info))

    return resp

}

exports.obtenerTodosLosTipoOrden = async (_, { }, context, info) => {

    let resp = await aurora.obtenerTodosLosTipoOrden(mysql, graphqlFields(info))

    return resp

}

exports.obtenerTipoOrden = async (_, { idTipoOrden }, context, info) => {

    let resp = await aurora.obtenerTipoOrden(mysql, idTipoOrden, graphqlFields(info))

    return resp

}

exports.obtenerInversionPorInstrumento = async (_, { idCartera, idInstrumento }, context, info) => {

    let cartera = await aurora.obtenerCartera(mysql, idCartera, graphqlFields(info))
    let instrumento = await aurora.obtenerInstrumento(mysql, obj.input.IdInstrumento, graphqlFields(info))

    if (!cartera || Object.keys(cartera) === 0) {
        throw `Cartera ${obj.input.IdCartera} no existe`
    }

    if (!instrumento || Object.keys(instrumento) === 0) {
        throw `Instrumento ${obj.input.IdInstrumento} no existe`
    }

    let resp = await aurora.obtenerInversionPorInstrumento(mysql, { idCartera, idInstrumento }, graphqlFields(info))

    return resp

}