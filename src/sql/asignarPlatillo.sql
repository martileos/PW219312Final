DELIMITER $$
CREATE FUNCTION asignarPlatillo (idPlatillo int, idCliente int, cantidadPlatillos int) 
RETURNS int
DETERMINISTIC
BEGIN 
  DECLARE dPrecio decimal;
  DECLARE iIdasigMesa int;
  DECLARE iIdOrden int;
  select precio into dPrecio from platillo where id_platillo = idPlatillo;
  select id_asigmesa into iIdasigMesa from asig_mesa where id_cliente = idCliente and estatus = 0;
  INSERT INTO ordenes(id_asigmesa,id_platillo) values (iIdasigMesa,idPlatillo);
  select id_orden into iIdOrden from ordenes where id_asigmesa = iIdasigMesa and estatus = 0;
  INSERT INTO detalleticket(id_orden,preciounit,cantidad) values (iIdOrden, dPrecio, cantidadPlatillos);
  RETURN 1;
END$$
DELIMITER ;