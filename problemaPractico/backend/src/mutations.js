const uuidv4 = require('uuid/v4');
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

console.log('config mutation 🚀', config.AURORA_HOST)

exports.crearUsuario = async (_, obj, context, info) => {

    let insert = null

    try {
        insert = await mysql.query('INSERT INTO usuarios (nombre, email) VALUES(?,?)', [obj.input.Nombre, obj.input.Email])
    } catch (error) {
        if (error.errno === 1062) {
            throw `Usuario con el correo ${obj.input.Email} ya existe`
        } else {
            console.debug(error)
            throw `Error no controlado`
        }

    }

    let resp = await aurora.obtenerUsuario(mysql, obj.input.Email, graphqlFields(info))

    return resp;
}

exports.modificarUsuario = async (_, obj, context, info) => {

    let insert = null

    let select = await mysql.query('SELECT id FROM usuarios WHERE id = ?', [obj.input.Id])

    if (select.length == 0) {
        throw `Usuario no existe`
    }

    try {
        insert = await mysql.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [obj.input.Nombre, obj.input.Email, obj.input.Id])
    } catch (error) {
        if (error.errno === 1062) {
            throw `Usuario con el correo ${obj.input.Email} ya existe`
        } else {
            console.debug(error)
            throw `Error no controlado`
        }
    }

    let resp = await aurora.obtenerUsuario(mysql, obj.input.Email, graphqlFields(info))

    return resp;
}