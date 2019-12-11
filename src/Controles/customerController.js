const controller = {};

controller.list = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query("Select * from CLIENTES",(err, customers) =>{
            if(err){
                res.json(err);
            }
            res.render("clientes", {
                data: customers
            })
        });
    });
}

controller.agregarCliente = (req, res) => {
    console.log(req.body);
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query("INSERT INTO clientes SET ?", [data], (err, customer) => {
            if(err){
                return res.status(400).json({message:"No se guardaron los datos del cliente."});
            }else{
                return res.status(200).json({message:"Se guardaron los datos correctamente."});
            }
        })
    })
}

controller.agregarPlatillo = (req, res) => {
    console.log(req.body);
    const data = req.body;
    req.getConnection((err,conn) => {
        conn.query("INSERT INTO platillo SET ?", [data], (err, customer) => {
            if(err){
                return res.status(400).json({message:"No se guardaron los datos del platillo."});
            }else{
                return res.status(200).json({message:"Se agregó el platillo correctamente."});
            }
        });
    })
}

controller.actualizarCliente = (req, res) =>{
    const data = req.body;
    const { id } = req.params;
    console.log(data);
    req.getConnection((err,conn) =>{
        conn.query("UPDATE CLIENTES SET ? WHERE id = ?", [data, id], (err, rows) => {
            if(err){
                return res.status(400).json({message:"No se pudieron actualizar los datos del cliente."});
            }else{
                return res.status(200).json({message:"Datos del cliente actualizados correctamente."});
            }
        })
    })
}

// Eliminar registros de clientes
controller.deleteCliente = (req, res) => {
	const { id } = req.params;
	req.getConnection((err,conn)=>{
		conn.query('UPDATE CLIENTES SET estatus = 1 WHERE id = ? AND  id NOT IN(SELECT id_cliente FROM ASIG_MESA WHERE estatus = 0)',[id], (err,rows)=>{
			if(err){
                return res.status(400).json({message:"No se pudo eliminar el cliente."});
            }else{
                return res.status(200).json({message:"Cliente eliminado satisfactoriamente."});
            }
		});
	})	
}

module.exports = controller;