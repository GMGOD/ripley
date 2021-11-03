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

exports.crearCartera = async (_, obj, context, info) => {
    let insert = null
    let resp = []
    let usuario = await aurora.obtenerUsuario(mysql, obj.input.Email, graphqlFields(info))

    if (usuario && Object.keys(usuario).length > 0 && usuario.Id) {
        try {
            insert = await mysql.query('INSERT INTO cartera (idUsuario, descripcion, estadoActivo)values(?,?,?)', [usuario.Id, obj.input.Descripcion, 1])
        } catch (error) {
            if (error.errno === 1062) {
                throw `Cartera ya existe`
            } else {
                console.debug(error)
                throw `Error no controlado`
            }
        }
    } else {
        throw `Usuario ${obj.input.Email} no existe`
    }

    if (insert) {
        resp = await aurora.obtenerCartera(mysql, insert.insertId, graphqlFields(info))
    }

    return resp;
}

exports.invertir = async (_, obj, context, info) => {
    let cartera = await aurora.obtenerCartera(mysql, obj.input.IdCartera, graphqlFields(info))
    let tipoOrden = await aurora.obtenerTipoOrden(mysql, obj.input.IdTipoOrden, graphqlFields(info))
    let instrumento = await aurora.obtenerInstrumento(mysql, obj.input.IdInstrumento, graphqlFields(info))

    if (!cartera || Object.keys(cartera) === 0) {
        throw `Cartera ${obj.input.IdCartera} no existe`
    }

    if (!tipoOrden || Object.keys(tipoOrden) === 0) {
        throw `TipoOrden ${obj.input.IdTipoOrden} no existe`
    }

    if (!instrumento || Object.keys(instrumento) === 0) {
        throw `Instrumento ${obj.input.IdInstrumento} no existe`
    }

    try {
        // TODO: Cuando se ingresa un, el estado es 3 (terminada), por simpleza, ya que es un MVP no lidiamos ahora con diferentes
        // TODO> estados, el ideal seria, 1 inciada -> 2 espera -> 3 terminada
        insert = await mysql.query(`
            INSERT INTO ordenInversiones (
                idCartera, idTipoOrden, idInstrumento, idEstadoOrden, fechaIntroduccion,
                fechaEjecucion, cantidad, precioEjecucion
            )values(?, ?, ?, ?, ?, ?, ?, ?)
        `, [cartera.Id, tipoOrden.Id, instrumento.Id, 3, new Date(), new Date(), obj.input.Cantidad, obj.input.Precio])
    } catch (error) {
        if (error.errno === 1062) {
            throw `Inversion ya existe`
        } else {
            console.debug(error)
            throw `Error no controlado`
        }
    }

    if (insert) {
        resp = await aurora.obtenerInversion(mysql, insert.insertId, graphqlFields(info))
    }

    return resp;
}

exports.modificarInversion = async (_, obj, context, info) => {
    let inversion = await aurora.obtenerInversion(mysql, obj.input.IdInversion, graphqlFields(info))

    if (!inversion || Object.keys(inversion) === 0) {
        throw `Inversion ${obj.input.IdInversion} no existe`
    }

    try {
        update = await mysql.query(`
            UPDATE ordenInversiones SET fechaIntroduccion = ?, cantidad = ?, precioEjecucion = ? WHERE id = ?
        `, [new Date(), obj.input.Cantidad, obj.input.Precio, obj.input.IdInversion])
    } catch (error) {
        if (error.errno === 1062) {
            throw `Inversion ya existe`
        } else {
            console.debug(error)
            throw `Error no controlado`
        }
    }

    if (update) {
        resp = await aurora.obtenerInversion(mysql, obj.input.IdInversion, graphqlFields(info))
    }

    return resp;
}