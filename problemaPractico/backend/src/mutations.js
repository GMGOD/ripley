const uuidv4 = require('uuid/v4');
let aurora = require('./common/aurora')
const mysql = require('./conn')
const dotenv = require('dotenv')
const path = require('path')
const graphqlFields = require('graphql-fields');
const { default: axios } = require('axios');

dotenv.config({ path: path.join(path.resolve(process.cwd()), '/.env') }).parsed

const config = {
    AURORA_HOST: process.env.AURORA_HOST,
    DB_NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    REGION: process.env.DB_REGION,
    TOKEN: process.env.TOKEN,
    BOLSA_SANTIAGO: process.env.BOLSA_SANTIAGO
}

console.log('config mutation 🚀', config.AURORA_HOST)

exports.crearUsuario = async (_, obj, context, info) => {

    let insert = null

    let select = await mysql.query('SELECT id FROM usuarios WHERE email = ?', [obj.input.Email])

    if (select.length > 0) {
        throw `Usuario ya existe`
    }

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

exports.actualizarInstrumentos = async (_, obj, context, info) => {
    //InstrumentosDisponibles/getInstrumentosValidos
    //TickerOnDemand/getIndiceses

    let options = {
        method: 'POST',
        url: `${config.BOLSA_SANTIAGO}ClienteMD/getInstrumentosRV`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        params: {
            'access_token': config.TOKEN
        },
        data: {}
    }

    await axios(options)
        .then(async resp => {
            let instrumentosDB = await mysql.query(`
                SELECT * FROM instrumentos
            `, [])
            if (instrumentosDB.length > 0) {
                await mysql.query(`
                    TRUNCATE TABLE instrumentos
                `, [])
            }
            await Promise.all(resp.data.listaResult.map(async x => {
                await mysql.query('INSERT INTO instrumentos (nombre, precioApertura, precioCierre, codigo)VALUES(?,?,?,?)', [
                    x.instruments, x.openPrice, x.closingPrice, x.codIsin
                ])
            }))
        })
        .catch(error => {
            throw error.toString()
        })

    let resp = await aurora.obtenerInstrumentos(mysql, graphqlFields(info))

    return resp;

}