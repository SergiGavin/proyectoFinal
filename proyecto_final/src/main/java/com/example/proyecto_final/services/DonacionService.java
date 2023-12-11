package com.example.proyecto_final.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.proyecto_final.entities.DonacionesEntity;
import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.repository.DonacionesRepository;

@Service
public class DonacionService {
	
	@Autowired
	private DonacionesRepository donacionesRepository;
	
	//Mostrar donacion
	public List<DonacionesEntity> getAllDonaciones(){
		return donacionesRepository.findAll();
	}
	
	//Crear un usuario 
	public DonacionesEntity createDonacion(DonacionesEntity donacion) {
		return donacionesRepository.save(donacion);
	}
	
	//Editar donacion --> el codigo es igual que el crear pero en este caso como ya habrá un ID existente de esa donacion
	// en vez de crearlo, lo actualizará.
	public DonacionesEntity updateDonacion(DonacionesEntity donacion) {
		return donacionesRepository.save(donacion);
	}
	
	//Eliminar donacion
	public void deleteDonacionById(Long id) {
		donacionesRepository.deleteById(id);
	}

}