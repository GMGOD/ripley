exports.obtenerUsuario = async (client, email, fields) => {
	let usuarios = {};

	let usuariosDB = await client.query(`
        SELECT id, nombre, email FROM usuarios WHERE email = ? 
    `, [email])

	if (usuariosDB.length == 0) {
		return null;
	}

	usuarios.Id = usuariosDB[0].id
	usuarios.Nombre = usuariosDB[0].nombre
	usuarios.Email = usuariosDB[0].email

	return usuarios;

}

exports.obtenerTodosLosUsuarios = async (client, fields) => {
	let usuarios = [];

	let usuariosDB = await client.query(`
        SELECT id, nombre, email FROM usuarios
    `, [])

	if (usuariosDB.length == 0) {
		return null;
	}

	usuarios = usuariosDB.map(usuario => {
		return {
			Id: usuario.id,
			Nombre: usuario.nombre,
			Email: usuario.email
		}
	});

	return usuarios;

}

exports.obtenerTodasMisInversiones = async (client, email, fields) => {
	let cartera = [];

	let carteraClientesDB = await client.query(`
		SELECT c.* FROM cartera AS c 
		INNER JOIN usuarios AS u ON u.id = c.IdUsuario
		WHERE u.email = ?
	`, [email])

	if (carteraClientesDB.length > 0) {

		cartera = carteraClientesDB.map(async x => {

			let ordenInversiones = []

			if (fields.OrdenInversiones) {

				let inversionesDB = await client.query(`
					SELECT * FROM ordenInversiones WHERE idCartera = ?
				`, [x.id])

				if (inversionesDB.length > 0) {
					ordenInversiones = await inversionesDB.map(async y => {
						let tipoOrden = "", instrumento = {}, estadoOrden = ""

						let tipoOrdenDB = await client.query(`
							SELECT descripcion FROM tipoOrden WHERE id = ?
						`, [y.idTipoOrden])

						if (tipoOrdenDB.length > 0) {
							tipoOrden = tipoOrdenDB[0].descripcion
						}

						if (fields.OrdenInversiones.Instrumento) {

							let instrumentosDB = await client.query(`
								SELECT * FROM instrumentos WHERE id = ?
							`, [y.idInstrumento])

							if (instrumentosDB.length > 0) {
								instrumento = {
									Id: instrumentosDB[0].id,
									Nombre: instrumentosDB[0].nombre,
									PrecioApertura: instrumentosDB[0].precioApertura,
									PrecioCierre: instrumentosDB[0].precioCierre,
									Codigo: instrumentosDB[0].codigo,
								}
							}
						}

						let estadoOrdenDB = await client.query(`
							SELECT descripcion FROM estadoOrden WHERE id = ?
						`, [y.idEstadoOrden])

						if (estadoOrdenDB.length > 0) {
							estadoOrden = estadoOrdenDB[0].descripcion
						}

						return {
							Id: y.id,
							IdCartera: y.idCartera,
							TipoOrden: tipoOrden,
							Instrumento: instrumento,
							EstadoOrden: estadoOrden,
							FechaInstroduccion: y.fechaInstroduccion,
							FechaEjecucion: y.fechaEjecucion,
							Cantidad: y.Cantidad,
							PrecioEjecucion: y.precioEjecucion
							//no existe precio de instroduccion por que se calcula segun el instrumento
							//No se si esto este bien, pero bueno, es un MVP
						}
					})
				}
			}

			return {
				Id: x.id,
				IdUsuario: x.idUsuario,
				Descripcion: x.descripcion,
				EstadoActivo: x.estadoActivo,
				OrdenInversiones: ordenInversiones
			}
		})
	}

	return cartera;

}

exports.obtenerInstrumentos = async (client, fields) => {
	let instrumentos = [];

	let instrumentosDB = await client.query(`
        SELECT * FROM instrumentos
    `, [])

	if (instrumentosDB.length == 0) {
		return instrumentos;
	}

	instrumentos = instrumentosDB.map(x => {
		return {
			Id: x.id,
			Nombre: x.nombre,
			PrecioApertura: x.precioApertura,
			PrecioCierre: x.precioCierre,
			Codigo: x.codigo
		}
	});

	return instrumentos;

}

exports.obtenerInstrumento = async (client, idInstrumento, fields) => {
	let instrumentos = {};

	let instrumentosDB = await client.query(`
        SELECT * FROM instrumentos WHERE id = ?
    `, [idInstrumento])

	if (instrumentosDB.length == 0) {
		return instrumentos;
	}

	instrumentos.Id = instrumentosDB[0].id
	instrumentos.Nombre = instrumentosDB[0].nombre
	instrumentos.PrecioApertura = instrumentosDB[0].precioApertura
	instrumentos.PrecioCierre = instrumentosDB[0].precioCierre
	instrumentos.Codigo = instrumentosDB[0].codig

	return instrumentos;

}

exports.obtenerInversiones = async (client, email, fields) => {

	let ordenInversiones = []

	let inversionesDB = await client.query(`
		SELECT o.* FROM ordenInversiones AS o
		LEFT JOIN cartera AS c ON c.id = o.idCartera
		LEFT JOIN usuarios AS u ON u.id = c.IdUsuario
		WHERE u.email = ?
	`, [email])

	if (inversionesDB.length > 0) {
		ordenInversiones = inversionesDB.map(async y => {
			let tipoOrden = "", instrumento = {}, estadoOrden = ""

			let tipoOrdenDB = await client.query(`
				SELECT descripcion FROM tipoOrden WHERE id = ?
			`, [y.idTipoOrden])

			if (tipoOrdenDB.length > 0) {
				tipoOrden = tipoOrdenDB[0].descripcion
			}

			if (fields.Instrumento) {

				let instrumentosDB = await client.query(`
					SELECT * FROM instrumentos WHERE id = ?
				`, [y.idInstrumento])

				if (instrumentosDB.length > 0) {
					instrumento = {
						Id: instrumentosDB[0].id,
						Nombre: instrumentosDB[0].nombre,
						PrecioApertura: instrumentosDB[0].precioApertura,
						PrecioCierre: instrumentosDB[0].precioCierre,
						Codigo: instrumentosDB[0].codigo,
					}
				}
			}

			let estadoOrdenDB = await client.query(`
				SELECT descripcion FROM estadoOrden WHERE id = ?
			`, [y.idEstadoOrden])

			if (estadoOrdenDB.length > 0) {
				estadoOrden = estadoOrdenDB[0].descripcion
			}

			return {
				Id: y.id,
				IdCartera: y.idCartera,
				TipoOrden: tipoOrden,
				Instrumento: instrumento,
				EstadoOrden: estadoOrden,
				FechaInstroduccion: y.fechaInstroduccion,
				FechaEjecucion: y.fechaEjecucion,
				Cantidad: y.Cantidad,
				PrecioEjecucion: y.precioEjecucion
				//no existe precio de instroduccion por que se calcula segun el instrumento
				//No se si esto este bien, pero bueno, es un MVP
			}
		})
	}

	return ordenInversiones;

}

exports.obtenerInversion = async (client, idInversion, fields) => {

	let ordenInversiones = {}

	let inversionesDB = await client.query(`
		SELECT o.* FROM ordenInversiones AS o
		LEFT JOIN cartera AS c ON c.id = o.idCartera
		WHERE o.id = ?
	`, [idInversion])

	if (inversionesDB.length === 0) {
		return ordenInversiones
	}

	let tipoOrden = "", instrumento = {}, estadoOrden = ""

	let tipoOrdenDB = await client.query(`
		SELECT descripcion FROM tipoOrden WHERE id = ?
	`, [inversionesDB[0].idTipoOrden])

	if (tipoOrdenDB.length > 0) {
		tipoOrden = tipoOrdenDB[0].descripcion
	}

	if (fields.Instrumento) {

		let instrumentosDB = await client.query(`
			SELECT * FROM instrumentos WHERE id = ?
		`, [inversionesDB[0].idInstrumento])

		if (instrumentosDB.length > 0) {
			instrumento = {
				Id: instrumentosDB[0].id,
				Nombre: instrumentosDB[0].nombre,
				PrecioApertura: instrumentosDB[0].precioApertura,
				PrecioCierre: instrumentosDB[0].precioCierre,
				Codigo: instrumentosDB[0].codigo,
			}
		}
	}

	let estadoOrdenDB = await client.query(`
		SELECT descripcion FROM estadoOrden WHERE id = ?
	`, [inversionesDB[0].idEstadoOrden])

	if (estadoOrdenDB.length > 0) {
		estadoOrden = estadoOrdenDB[0].descripcion
	}

	ordenInversiones.Id = inversionesDB[0].id
	ordenInversiones.IdCartera = inversionesDB[0].idCartera
	ordenInversiones.TipoOrden = tipoOrden
	ordenInversiones.Instrumento = instrumento
	ordenInversiones.EstadoOrden = estadoOrden
	ordenInversiones.FechaInstroduccion = inversionesDB[0].fechaInstroduccion
	ordenInversiones.FechaEjecucion = inversionesDB[0].fechaEjecucion
	ordenInversiones.Cantidad = inversionesDB[0].cantidad
	ordenInversiones.PrecioEjecucion = inversionesDB[0].precioEjecucion
	//no existe precio de instroduccion por que se calcula segun el instrumento
	//No se si esto este bien, pero bueno, es un MVP

	return ordenInversiones;

}

exports.obtenerCartera = async (client, idCartera, fields) => {
	let cartera = [];

	let carteraClientesDB = await client.query(`
		SELECT * FROM cartera
		WHERE id = ?
	`, [idCartera])

	if (carteraClientesDB.length > 0) {

		let ordenInversiones = []

		if (fields.OrdenInversiones) {

			let inversionesDB = await client.query(`
				SELECT * FROM ordenInversiones WHERE idCartera = ?
			`, [carteraClientesDB[0].id])

			if (inversionesDB.length > 0) {
				ordenInversiones = await inversionesDB.map(async y => {
					let tipoOrden = "", instrumento = {}, estadoOrden = ""

					let tipoOrdenDB = await client.query(`
						SELECT descripcion FROM tipoOrden WHERE id = ?
					`, [y.idTipoOrden])

					if (tipoOrdenDB.length > 0) {
						tipoOrden = tipoOrdenDB[0].descripcion
					}

					if (fields.OrdenInversiones.Instrumento) {

						let instrumentosDB = await client.query(`
							SELECT * FROM instrumentos WHERE id = ?
						`, [y.idInstrumento])

						if (instrumentosDB.length > 0) {
							instrumento = {
								Id: instrumentosDB[0].id,
								Nombre: instrumentosDB[0].nombre,
								PrecioApertura: instrumentosDB[0].precioApertura,
								PrecioCierre: instrumentosDB[0].precioCierre,
								Codigo: instrumentosDB[0].codigo,
							}
						}
					}

					let estadoOrdenDB = await client.query(`
						SELECT descripcion FROM estadoOrden WHERE id = ?
					`, [y.idEstadoOrden])

					if (estadoOrdenDB.length > 0) {
						estadoOrden = estadoOrdenDB[0].descripcion
					}

					return {
						Id: y.id,
						IdCartera: y.idCartera,
						TipoOrden: tipoOrden,
						Instrumento: instrumento,
						EstadoOrden: estadoOrden,
						FechaInstroduccion: y.fechaInstroduccion,
						FechaEjecucion: y.fechaEjecucion,
						Cantidad: y.Cantidad,
						PrecioEjecucion: y.precioEjecucion
						//no existe precio de instroduccion por que se calcula segun el instrumento
						//No se si esto este bien, pero bueno, es un MVP
					}
				})
			}
		}

		cartera.Id = carteraClientesDB[0].id,
			cartera.IdUsuario = carteraClientesDB[0].idUsuario,
			cartera.Descripcion = carteraClientesDB[0].descripcion,
			cartera.EstadoActivo = carteraClientesDB[0].estadoActivo,
			cartera.OrdenInversiones = ordenInversiones
	}

	return cartera;

}

exports.obtenerTodosLosTipoOrden = async (client, fields) => {
	let tipoOrden = [];

	let tipoOrdenDB = await client.query(`
        SELECT * FROM tipoOrden
    `, [])

	if (tipoOrdenDB.length == 0) {
		return null;
	}

	tipoOrden = tipoOrdenDB.map(tipo => {
		return {
			Id: tipo.id,
			Descripcion: tipo.descripcion
		}
	});

	return tipoOrden;
}

exports.obtenerTipoOrden = async (client, idTipoOrden, fields) => {
	let tipoOrden = {};

	let tipoOrdenDB = await client.query(`
	SELECT * FROM tipoOrden WHERE id = ?
    `, [idTipoOrden])

	if (tipoOrdenDB.length == 0) {
		return null;
	}

	tipoOrden.Id = tipoOrdenDB[0].id,
		tipoOrden.Descripcion = tipoOrdenDB[0].descripcion

	return tipoOrden;
}