package com.example.proyecto_final.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.proyecto_final.entities.PrestamosEntity;
import com.example.proyecto_final.services.PrestamoService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("swap-reads/prestamo")
public class PrestamosController {

	@Autowired
	private PrestamoService prestamoService;
	
		//GET
		@GetMapping
		public List<PrestamosEntity> listarPrestamo(){
			return prestamoService.getAllPrestamos();
		}
		
		//POST
		@PostMapping
		public PrestamosEntity crearPrestamo(@RequestBody PrestamosEntity prestamo) {
			return prestamoService.createPrestamo(prestamo);
		}
		
		//PUT
		@PostMapping("editar/{id}")
		//Pasamos como variable el id ya que se necesitará para editar la donacion en especifico.
		public PrestamosEntity actualizarPrestamo(@RequestBody PrestamosEntity prestamo, @PathVariable Long id) {
			prestamo.setIdPrestamo(id);
			return prestamoService.updatePrestamo(prestamo);
		}
		//DELETE
		@DeleteMapping("eliminar/{id}")
		public void eliminarPrestamo(@PathVariable Long id) {
			prestamoService.deletePrestamoById(id);
		}
}
