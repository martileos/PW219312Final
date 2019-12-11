const controller = {};

// Consultar platillos y bebidas
controller.list = (req, res) => {
	req.getConnection((err, conn) => {
		return conn.query('SELECT * FROM PLATILLO', (err, platillo) => {
			res.render('productos', {data: platillo});
		});
	})
}

// Registrar de platillos y bebidas
controller.crear = (req, res) => {
	const data = req.body;
	req.getConnection((err, conn) => {
		return conn.query('INSERT INTO platillo set ?', [data], (err, rows) => {
			if (err) {
				return res.status(400).json({message:"No se guardaron los datos del platillo."});
			} else {
				return res.status(200).json({message:"Se agregó el platillo correctamente."});
			}
		});
	})
}

// Actualizar platillos y bebidas
controller.update = (req, res) => {
	const {id} = req.params;
	const newPlatillo = req.body;
	req.getConnection((err, conn) => {
		conn.query('UPDATE PLATILLO set ? WHERE id_platillo = ? AND id_platillo not in (select id_platillo from ORDENES WHERE estatus = 0', [newPlatillo, id], (err, rows) => {
			if(err){
				return res.status(400).json({message:"No se pudo actualizar la información del platillo."});
			}else{
				return res.status(200).json({message:"Información del platillo actualizada de manera éxitosa."});
			}
		})
	})
}

controller.deletePlatillo =(req,res) =>{
    const { id } = req.params;
    req.getConnection((err,conn) =>{
        conn.query("UPDATE PLATILLO SET estatus = 1  WHERE id_platillo = ? AND id_platillo not in (select id_platillo from ORDENES WHERE estatus = 0)"
        , [id], (err, rows) => {
            if(err){
                return res.status(400).json({message:"No fue posible eliminar el platillo."});
            }else{
                return res.status(200).json({message:"Platillo eliminado correctamente."});
            }
        })
    })
}

// Asignación de platillos y bebidas por persona (el procedimiento viene del archivo baseDatos)
controller.asignar = (res, req) => {
	const data = req.body;

	req.getConnection((err, conn) => {
		conn.query('SELECT asignarPlatillo(?, ?, ?)', [data.idPlatillo, data.idCliente, data.cantidad], (err, rows) => {
			if(err){
				return res.status(400).json({message:"No se pudo asignar el platillo."});
			}else{
				return res.status(200).json({message:"Asignado correctamente."});
			}
		})
	})
}

module.exports = controller;
// Asignación de platillos y bebidas por persona
