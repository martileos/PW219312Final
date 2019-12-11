const controller = {};

controller.list = (req, res) => {
	req.getConnection((err,conn)=>{
		conn.query('select * from MESA',(err,mesas)=>{
			if (err) {
				return res.status(500).json(err);
			}
			//console.log(customers);
			res.render('mesas',{
				data: mesas
			})
		})
	})
}
controller.resgistrar_mesa = (req, res) => {
	const data = req.body;
	if(data.capacidad !== 4 && data.capacidad !== 6){
		return res.status(400).json({message:"No se guardaron los datos de la mesa"});
	}
	if(data.descripcion.length > 50){
		return res.status(400).json({message:"No se guardaron los datos de la mesa"});
	}
	req.getConnection((err,conn)=>{
		return conn.query('insert into MESA set ?',[data],(error,rows)=>{
			if (error) {
				return res.status(400).json({message:"No se guardaron los datos de la mesa"});
			} else {
				return res.status(200).json({message:"Se registro la mesa correctamente"});
			}
		});
	})
}

//Actualizar datos de la mesa ------> Elaborado por Kevin Lizarraga
controller.actualizarMesa = (req, res) =>{
    const data = req.body;
    const { id } = req.params;
    console.log(data);
    req.getConnection((err,conn) =>{
        conn.query("UPDATE MESA SET ? WHERE id_mesa = ?", [data, id], (err, rows) => {
            if(err){
                res.status(400).json({message:"No se pudo actualizar la mesa."});
            }else{
                res.status(200).json({message:"Mesa actualizada correctamente."});
            }
        })
    })
}

//Consultar mesa ------> Elaborado por Luis Ibarra
controller.consultarMesa = (req, res) => {
	const { id } = req.params;
	req.getConnection((err,conn)=>{
		conn.query('SELECT * FROM MESA WHERE id_mesa=?',[id],(err,rows)=>{
			//Llamar a la pantalla de edicion de datos
			console.log(rows)
			res.render('customerEdit',{
				data: rows[0]
			})
		});
	})
}

module.exports= controller;
