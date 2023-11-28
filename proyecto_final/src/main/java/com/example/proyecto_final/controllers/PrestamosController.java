package com.example.proyecto_final.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.DTO.PrestamoDTO;
import com.example.proyecto_final.entities.PrestamosEntity;
import com.example.proyecto_final.services.PrestamoService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/prestamos")
public class PrestamosController {

	@Autowired
	private PrestamoService prestamoService;
	
		//GET
		@GetMapping
		 public List<PrestamoDTO> getAllPrestamos() {
	        return prestamoService.getAllPrestamos();
	    }
		@GetMapping("/{id}")
		public ResponseEntity<PrestamoDTO> getPrestamoById(@PathVariable Long id) {
		    Optional<PrestamosEntity> prestamo = prestamoService.getPrestamosById(id);

		    if (prestamo.isPresent()) {
		        PrestamoDTO prestamoDTO = prestamoService.prestamoToDTO(prestamo.get());
		        return new ResponseEntity<>(prestamoDTO, HttpStatus.OK);
		    } else {
		        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		    }
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
