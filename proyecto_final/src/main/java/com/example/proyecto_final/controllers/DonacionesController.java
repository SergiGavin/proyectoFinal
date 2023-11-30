package com.example.proyecto_final.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.DonacionesEntity;
import com.example.proyecto_final.services.DonacionService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;


@RestController
@RequestMapping("/donaciones")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000","http://localhost:5500", "http://127.0.0.1:5500","http://localhost:5173","http://127.0.0.1:5173" })
public class DonacionesController {

	@Autowired
	private DonacionService donacionService;
	
		//GET
		@GetMapping
		public List<DonacionesEntity> listarDonaciones(){
			return donacionService.getAllDonaciones();
		}
		
		//POST
		@PostMapping
		public DonacionesEntity crearDonacion(@RequestBody DonacionesEntity donacion) {
			return donacionService.createDonacion(donacion);
		}
		
		//PUT
//		@PostMapping("editar/{id}")
//		//Pasamos como variable el id ya que se necesitará para editar la donacion en especifico.
//		public DonacionesEntity actualizarDonacion(@RequestBody DonacionesEntity donacion, @PathVariable Long id) {
//			donacion.setIdDonacion(id);
//			return donacionService.updateDonacion(donacion);
//		}
		//DELETE
		@DeleteMapping("eliminar/{id}")
		public void eliminarDonacion(@PathVariable Long id) {
			donacionService.deleteDonacionById(id);
		}
}
