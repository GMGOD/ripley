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