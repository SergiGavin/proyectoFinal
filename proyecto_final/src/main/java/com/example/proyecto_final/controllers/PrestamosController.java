package com.example.proyecto_final.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.PrestamosEntity;
import com.example.proyecto_final.services.PrestamoService;



@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequestMapping("/prestamos")
//@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000","http://localhost:5500", "http://127.0.0.1:5500","http://localhost:5173","http://127.0.0.1:5173" })

public class PrestamosController {

	@Autowired
	private PrestamoService prestamoService;
	
		//GET
		@GetMapping
		 public List<PrestamosEntity> getAllPrestamos() {
	        return prestamoService.getAllPrestamos();
	    }
		@GetMapping("/{id}")
		public ResponseEntity<?> getPrestamoById(@PathVariable Long id) {
		    Optional<PrestamosEntity> prestamoPorId = prestamoService.getPrestamosById(id);
		    if (prestamoPorId.isPresent()) {
		        return new ResponseEntity<>(prestamoPorId, HttpStatus.OK);
		    } else {
		    	String mensaje = "No se encontró ningún prestamo con el ID: " + id;
				return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		    }
		}
		
		@GetMapping("/usuarios/{id_usuarios}")
	    public ResponseEntity<?> getPrestamosById_usuarios(@PathVariable Long id_usuarios) {
	        List<PrestamosEntity> prestamoPorUserId = prestamoService.getPrestamosByUserId(id_usuarios);
	        if (!prestamoPorUserId.isEmpty()) {
	            return new ResponseEntity<>(prestamoPorUserId, HttpStatus.OK);
	        } else {
	            String mensaje = "No se encontró ningún préstamo con el ID: " + id_usuarios;
	            System.out.println(mensaje);
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	


		
		//Put
		@PutMapping
		public PrestamosEntity crearPrestamo(@RequestBody PrestamosEntity prestamo) {
		
			Date today = new Date();
			PrestamosEntity newPrestamo = new PrestamosEntity(
					prestamo.getFechaDevolucion(),
					prestamo.getIdUsuarios(),
					prestamo.getId_libros()
					
			); 
			newPrestamo.setFechaPrestamo(today);
			System.out.println("Datos del usuario recibidos: "+newPrestamo.toString());
			System.out.println(newPrestamo.getFechaPrestamo());
			return prestamoService.createPrestamo(newPrestamo);
		}
		
		//DELETE
		@DeleteMapping("eliminar/{id}")
		public void eliminarPrestamo(@PathVariable Long id) {
			prestamoService.deletePrestamoById(id);
		}
}
