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

exports.obtenerCarteras = async (_, { email }, context, info) => {

    let usuario = await aurora.obtenerUsuario(mysql, email, graphqlFields(info))

    if (!usuario || Object.keys(usuario).length === 0) {
        throw `Usuario ${email} no existe`
    }

    let resp = await aurora.obtenerCarteras(mysql, usuario.Id, graphqlFields(info))

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

    if (!cartera || Object.keys(cartera).length === 0) {
        throw `Cartera ${obj.input.IdCartera} no existe`
    }

    let instrumento = await aurora.obtenerInstrumento(mysql, idInstrumento, graphqlFields(info))

    if (!instrumento || Object.keys(instrumento).length === 0) {
        throw `Instrumento ${obj.input.IdInstrumento} no existe`
    }

    let resp = await aurora.obtenerInversionPorInstrumento(mysql, { idCartera, idInstrumento }, graphqlFields(info))

    return resp

}

exports.obtenerInversionPorInstrumento = async (_, { email }, context, info) => {

    let usuario = await aurora.obtenerUsuario(mysql, email, graphqlFields(info))

    if (!usuario || Object.keys(usuario).length === 0) {
        throw `Usuario ${email} no existe`
    }

    let cartera = await aurora.obtenerCartera(mysql, usuario.Id, graphqlFields(info))

    if (!cartera || Object.keys(cartera).length === 0) {
        throw `Cartera ${obj.input.IdCartera} no existe`
    }

    let resp = await aurora.obtenerInversionPorInstrumento(mysql, { idCartera, idInstrumento }, graphqlFields(info))

    return resp

}

exports.obtenerHistoricoGananciasPerdidasCartera = async (_, { email }, context, info) => {

    let resp = {}

    let usuario = await aurora.obtenerUsuario(mysql, email, graphqlFields(info))

    if (!usuario || Object.keys(usuario).length === 0) {
        throw `Usuario ${email} no existe`
    }

    let cartera = await aurora.obtenerCarteras(mysql, usuario.Id, graphqlFields(info))

    if (cartera && cartera.length > 0) {
        resp.Email = email
        resp.Resultado = cartera.reduce((pv, cv, ci) => {
            if (cv.OrdenInversiones && cv.OrdenInversiones.length > 0) {
                let ordenesReduce = cv.OrdenInversiones.reduce((pv2, cv2) => {
                    if (cv2.Instrumento && Object.keys(cv2.Instrumento).length > 0) {
                        let inversion = cv2.PrecioEjecucion * cv2.Cantidad
                        let ganancia = (cv2.Instrumento.PrecioApertura * cv2.Cantidad) - inversion
                        return pv2 = pv2 + (ganancia - inversion)
                    } else {
                        return pv2
                    }
                }, 0)

                return pv = pv + ordenesReduce

            } else {
                return pv
            }
        }, 0)
    }

    return resp

}

exports.compararHistoricoGananciasPerdidasCarteraUsuarioAB = async (_, { emailUsuarioA, emailUsuarioB }, context, info) => {

    if (emailUsuarioA === emailUsuarioB) {
        throw `Usuario ${emailUsuarioA}  es igual a ${emailUsuarioB}`
    }

    let resp = []

    let usuarioA = await aurora.obtenerUsuario(mysql, emailUsuarioA, graphqlFields(info))

    if (!usuarioA || Object.keys(usuarioA).length === 0) {
        throw `Usuario ${emailUsuarioA} no existe`
    }

    let usuarioB = await aurora.obtenerUsuario(mysql, emailUsuarioB, graphqlFields(info))

    if (!usuarioB || Object.keys(usuarioB).length === 0) {
        throw `Usuario ${emailUsuarioB} no existe`
    }

    let carteraA = await aurora.obtenerCarteras(mysql, usuarioA.Id, graphqlFields(info))

    let carteraB = await aurora.obtenerCarteras(mysql, usuarioB.Id, graphqlFields(info))

    if (carteraA && carteraA.length > 0) {
        resp.push({
            Email: emailUsuarioA,
            Resultado: carteraA.reduce((pv, cv, ci) => {
                if (cv.OrdenInversiones && cv.OrdenInversiones.length > 0) {
                    let ordenesReduce = cv.OrdenInversiones.reduce((pv2, cv2) => {
                        if (cv2.Instrumento && Object.keys(cv2.Instrumento).length > 0) {
                            let inversion = cv2.PrecioEjecucion * cv2.Cantidad
                            let ganancia = (cv2.Instrumento.PrecioApertura * cv2.Cantidad) - inversion
                            return pv2 = pv2 + (ganancia - inversion)
                        } else {
                            return pv2
                        }
                    }, 0)

                    return pv = pv + ordenesReduce

                } else {
                    return pv
                }
            }, 0)
        })

    } else {
        resp.push({})
    }

    if (carteraB && carteraB.length > 0) {
        resp.push({
            Email: emailUsuarioB,
            Resultado: carteraB.reduce((pv, cv, ci) => {
                if (cv.OrdenInversiones && cv.OrdenInversiones.length > 0) {
                    let ordenesReduce = cv.OrdenInversiones.reduce((pv2, cv2) => {
                        if (cv2.Instrumento && Object.keys(cv2.Instrumento).length > 0) {
                            let inversion = cv2.PrecioEjecucion * cv2.Cantidad
                            let ganancia = (cv2.Instrumento.PrecioApertura * cv2.Cantidad) - inversion
                            return pv2 = pv2 + (ganancia - inversion)
                        } else {
                            return pv2
                        }
                    }, 0)

                    return pv = pv + ordenesReduce

                } else {
                    return pv
                }
            }, 0)
        })

    } else {
        resp.push({})
    }

    return resp

}