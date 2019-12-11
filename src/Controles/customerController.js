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
//gera
controller.listCta = (req,res) => {
	const { id } = req.params;
	req.getConnection((err,conn)=>{
		conn.query('select  p.nombre_producto,sum(dt.cantidad) as cantidad, sum((dt.cantidad * p.precio)) as Subtotal, am.id_cliente, dt.id_detalleticket from platillo p inner join ordenes o on p.id_platillo = o.id_platillo inner join detalleticket dt on dt.id_orden = o.id_orden and o.estatus = 1 and dt.estatus = 1 inner join asig_mesa am on am.id_asigmesa = o.id_asigmesa where am.id_asigmesa = ? group by am.id_cliente,p.nombre_producto order by am.id_cliente',[id]
            ,(err,asig_mesa)=>{
            	
			if(err)
			{
				res.status(400).json({message:"No es posible recuperar la información de los platillos y bebidas"});
			}
				res.render('Customer',{
				data: asig_mesa
			})
		})
	})
}
//gera
controller.cobrarCuenta = (req,res) =>
{
		var SubtotalTotal = 0;
		var Total = 0;
		var iva = (16/100);
		var date = new Date();

		var dia = date.getDate();
		var mes = date.getMonth()+1;
		var ano = date.getFullYear();
		var fecha = dia+"/"+mes+"/"+ano;

	const { id_mesa } = req.params;		
	req.getConnection((err,conn)=>{
			return conn.query('select  p.nombre_producto,sum(dt.cantidad) as cantidad, sum((dt.cantidad * p.precio)) as Subtotal, am.id_cliente, dt.id_detalleticket from platillo p inner join ordenes o on p.id_platillo = o.id_platillo inner join detalleticket dt on dt.id_orden = o.id_orden and o.estatus = 1 and dt.estatus = 1 inner join asig_mesa am on am.id_asigmesa = o.id_asigmesa where am.id_asigmesa = ? group by am.id_cliente,p.nombre_producto order by am.id_cliente',[id_mesa]
				,(err,asig_mesa)=>{
					if(err)
					{
						res.status(400).json({message:"No es posible recuperar la información de los platillos y bebidas"});
					}
				for (var i = 0; i<asig_mesa.length; i++)
				{
					SubtotalTotal+=asig_mesa[i].Subtotal;
				}
				Total = SubtotalTotal + (SubtotalTotal * iva);
				return conn.query('insert into ticket (id_detalleticket,subtotal,iva,total,fecha,estatus) values ('+asig_mesa[0].id_detalleticket+','+SubtotalTotal+','+iva+','+Total+','+'NOW()'+','+1+')',(err,insert)=>
					{
						if(err){

							return res.status(400).json({message:"Por el momento no es posible generar el cobro de la cuenta"});
						}

						return res.status(200).json({Total,SubtotalTotal,iva,fecha});
					})
			})
		 })
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