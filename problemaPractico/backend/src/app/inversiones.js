// Feature 1 (¿Que inversiones tengo?): Obtener todas las inversiones (Instrumentos y cantidad de acciones) de la cartera del señor Risopatron.
exports.obtenerInversiones = async (event) => {
    let retorno = {
        statusCode: 200, body: { message: "", error: "" }
    }

    retorno = {
        ...retorno,
        body: JSON.stringify(retorno.body)
    }

    return retorno
}
//Feature 2 (Quiero invertir en otra cosa!): Agregar una inversión a la cartera del señor Risopatron. (Numero de acciones, Fecha de ultima actualización, Nombre, Monto de Inversión en CLP)
exports.invertir = async (event) => {
    let retorno = {
        statusCode: 200, body: { message: "", error: "" }
    }

    retorno = {
        ...retorno,
        body: JSON.stringify(retorno.body)
    }

    return retorno
}
//Feature 3 (Quiero invertir mas): Actualizar una inversión a la cartera del señor Risopatron. (Numero de acciones, Fecha de ultima actualización, Nombre, Monto de Inversión en CLP Actualizado)
exports.actualizarInversion = async (event) => {
    let retorno = {
        statusCode: 200, body: { message: "", error: "" }
    }

    retorno = {
        ...retorno,
        body: JSON.stringify(retorno.body)
    }

    return retorno
}
//Feature 4 (¿Como van mis inversiones en Colbun S.A?): Obtener el estado (Rentabilidad y estado de inversión) de un instrumento en particular de la cartera.
exports.obtenerEstadoInversion = async (event) => {
    let retorno = {
        statusCode: 200, body: { message: "", error: "" }
    }

    retorno = {
        ...retorno,
        body: JSON.stringify(retorno.body)
    }

    return retorno
}
//Feature 5 (¿Como van mis inversiones, hoy estamos ganando o perdiendo?): Obtener el estado (Rentabilidad y estado de inversión) de toda la cartera.
exports.estadoInversiones = async (event) => {
    let retorno = {
        statusCode: 200, body: { message: "", error: "" }
    }

    retorno = {
        ...retorno,
        body: JSON.stringify(retorno.body)
    }

    return retorno
}
//Feature 7 (¿Desde que comence como van mis inversiones?): Obtener el monto de ganancias/perdidas vs el dinero invertido de toda la cartera.
exports.estadoGlobalInversiones = async (event) => {
    let retorno = {
        statusCode: 200, body: { message: "", error: "" }
    }

    retorno = {
        ...retorno,
        body: JSON.stringify(retorno.body)
    }

    return retorno
}