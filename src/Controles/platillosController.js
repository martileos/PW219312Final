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

// Eliminar registros de clientes
controller.delete = (req, res) => {
	const { id } = req.params;
	req.getConnection((err,conn)=>{
		conn.query('delete from clientes where id=?',[id], (err,rows)=>{
			res.redirect('/');
		});
	})	
}

// Actualizar platillos y bebidas
controller.update = (req, res) => {
	const {id} = req.params;
	const newPlatillo = req.body;
	req.getConnection((err, conn) => {
		conn.query('UPDATE platillo set ? WHERE id = ?', [newPlatillo, id], (err, rows) => {
			res.redirect('/');
		})
	})
}

controller.deletePlatillo =(req,res) =>{
    const { id } = req.params;
    console.log(data);
    req.getConnection((err,conn) =>{
        conn.query("UPDATE platillo SET estatus = 1  WHERE id_platillo = ? AND id_platillo not in (select id_platillo from ordenes where estatus <> 0)"
        , [id], (err, rows) => {
            if(err){
                res.status(400).json({message:"No se pudo actualizar la mesa."});
            }else{
                res.status(200).json({message:"Mesa actualizada correctamente."});
            }
        })
    })
}

module.exports = controller;
// Asignación de platillos y bebidas por persona
