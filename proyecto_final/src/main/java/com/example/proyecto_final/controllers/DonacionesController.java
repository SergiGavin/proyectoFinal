package com.example.proyecto_final.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.dtos.DonacionesDTO;
import com.example.proyecto_final.entities.DonacionesEntity;
import com.example.proyecto_final.services.DonacionService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/donaciones")
public class DonacionesController {

	@Autowired
	private DonacionService donacionService;
	
		//GET
		@GetMapping
		public List<DonacionesEntity> listarDonaciones(){
			return donacionService.getAllDonaciones();
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Object> getDonacionesById(@PathVariable Long id) {
		    Optional<DonacionesEntity> donacionPorId = donacionService.getDonacionesById(id);

		    if (donacionPorId.isPresent()) {
		        DonacionesEntity donacionEntity = donacionPorId.get();
		        DonacionesDTO donacionesDTO = new DonacionesDTO(donacionEntity);
		        return new ResponseEntity<>(donacionesDTO, HttpStatus.OK);
		    } else {
		        String mensaje = "No se encontró ningúna donacion con el ID: " + id;
		        return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		    }
		}
		
		//PUT
		@PutMapping
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
