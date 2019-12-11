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

controller.actualizarMesa = (req, res) =>{
    const data = req.body;
    const { id } = req.params;
    console.log(data);
    req.getConnection((err,conn) =>{
        conn.query("UPDATE SET ? WHERE id_mesa = ?", [data, id], (err, rows) => {
            if(err){
                res.status(400).json({message:"No se pudo actualizar la mesa."});
            }else{
                res.status(200).json({message:"Mesa actualizada correctamente."});
            }
        })
    })
}

controller.actualizarCliente = (req, res) =>{
    const data = req.body;
    const { id } = req.params;
    console.log(data);
    req.getConnection((err,conn) =>{
        conn.query("UPDATE clientes SET ? WHERE id_mesa = ?", [data, id], (err, rows) => {
            if(err){
                res.status(400).json({message:"No se pudo actualizar la mesa."});
            }else{
                res.status(200).json({message:"Mesa actualizada correctamente."});
            }
        })
    })
}

module.exports = controller;