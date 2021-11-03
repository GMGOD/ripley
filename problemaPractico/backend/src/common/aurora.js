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

			if (fields.Cartera.OrdenInversiones) {

				let inversionesDB = await client.query(`
					SELECT * FROM ordenInversiones WHERE idCartera = ?
				`, [x.id])

				if (inversionesDB) {
					ordenInversiones = inversionesDB.map(async y => {
						let tipoOrden = "", instrumento = {}, estadoOrden = ""

						let tipoOrdenDB = await client.query(`
							SELECT descripcion FROM tipoOrden WHERE id = ?
						`, [y.idTipoOrden])

						if (tipoOrdenDB.length > 0) {
							tipoOrden = tipoOrdenDB[0].descripcion
						}

						if (fields.Cartera.OrdenInversiones.Instrumento) {

							let instrumentosDB = await client.query(`
								SELECT * FROM instrumentos WHERE idInstrumento = ?
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

exports.obtenerInstrumentos = async (client, email, fields) => {

	let ordenInversiones = []

	let inversionesDB = await client.query(`
		SELECT o.* FROM ordenInversiones AS o
		INNER JOIN cartera AS c ON c.id = o.idCartera
		INNER JOIN usuarios AS u ON u.id = c.IdUsuario
		WHERE u.email = ?
	`, [email])

	if (inversionesDB) {
		ordenInversiones = inversionesDB.map(async y => {
			let tipoOrden = "", instrumento = {}, estadoOrden = ""

			let tipoOrdenDB = await client.query(`
				SELECT descripcion FROM tipoOrden WHERE id = ?
			`, [y.idTipoOrden])

			if (tipoOrdenDB.length > 0) {
				tipoOrden = tipoOrdenDB[0].descripcion
			}

			if (fields.Cartera.OrdenInversiones.Instrumento) {

				let instrumentosDB = await client.query(`
					SELECT * FROM instrumentos WHERE idInstrumento = ?
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

