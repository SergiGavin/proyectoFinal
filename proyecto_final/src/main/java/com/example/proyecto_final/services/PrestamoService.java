package com.example.proyecto_final.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.proyecto_final.entities.PrestamosEntity;
import com.example.proyecto_final.repository.PrestamosRepository;

@Service
public class PrestamoService {
	
	@Autowired
	private PrestamosRepository prestamosRepository;
	
	//Mostrar prestamos
	public List<PrestamosEntity> getAllPrestamos(){
		return prestamosRepository.findAll();
	}
	
	//Crear un prestamo 
	public PrestamosEntity createPrestamo(PrestamosEntity prestamo) {
		return prestamosRepository.save(prestamo);
	}
	
	//Editar prestamo --> el codigo es igual que el crear pero en este caso como ya habrá un ID existente de ese prestamo
	// en vez de crearlo, lo actualizará.
	public PrestamosEntity updatePrestamo(PrestamosEntity prestamo) {
		return prestamosRepository.save(prestamo);
	}
	
	//Eliminar prestamo
	public void deletePrestamoById(Long id) {
		prestamosRepository.deleteById(id);
	}

}

