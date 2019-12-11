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
controller.delete = (req, res) => {
	const { id } = req.params;
	req.getConnection((err,conn)=>{
		conn.query('delete from customers where id=?',[id], (err,rows)=>{
			res.redirect('/');
		});
	})
}
controller.edit = (req, res) => {
	const { id } = req.params;
	req.getConnection((err,conn)=>{
		conn.query('select * from customers where id=?',[id], (err,customer)=>{
			//Llamar a la pantalla de edicion de datos
			res.render('customerEdit',{
				data: customer[0]
			})
		});
	})
}
module.exports= controller;
