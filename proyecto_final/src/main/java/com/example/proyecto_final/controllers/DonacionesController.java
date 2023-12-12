package com.example.proyecto_final.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.DonacionesEntity;
import com.example.proyecto_final.services.DonacionService;
import com.example.proyecto_final.services.UsuarioService;




@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequestMapping("/donaciones")
//@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000","http://localhost:5500", "http://127.0.0.1:5500","http://localhost:5173","http://127.0.0.1:5173" })

public class DonacionesController {

	@Autowired
	private DonacionService donacionService;
	
		//GET
		@GetMapping
		public List<DonacionesEntity> listarDonaciones(){
			return donacionService.getAllDonaciones();
		}
		
		//PUT
		@PutMapping
		public DonacionesEntity crearDonacion(@RequestBody DonacionesEntity donacion) {
			Date today = new Date();
			DonacionesEntity newDonacion = new DonacionesEntity(
						donacion.getId_usuarios(),
						donacion.getId_libros()
					);
			
			newDonacion.setFecha_donacion(today);
			System.out.println("Datos del usuario recibidos: "+newDonacion.toString());
			System.out.println("Fecha donacion de newDonacion: "+newDonacion.getFecha_donacion());
			return donacionService.createDonacion(donacion);
		}
		
		//DELETE
		@DeleteMapping("eliminar/{id}")
		public void eliminarDonacion(@PathVariable Long id) {
			donacionService.deleteDonacionById(id);
		}
		
}
