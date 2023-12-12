package com.example.proyecto_final.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
	
    public Optional<DonacionesEntity> obtenerDonacionPorUsuario(UsuariosEntity usuario) {
        List<DonacionesEntity> donacionesUsuario = donacionesRepository.findAll()
                .stream()
                .filter(d -> d.getId_usuarios().equals(usuario.getId_usuarios()))
                .collect(Collectors.toList());

        if (!donacionesUsuario.isEmpty()) {
            // Si hay donaciones para el usuario, puedes decidir qué donación devolver aquí.
            // En este caso, devolveré la primera donación encontrada.
            return Optional.of(donacionesUsuario.get(0));
        } else {
            // Si no hay donaciones para el usuario, devolver un Optional vacío.
            return Optional.empty();
        }
    }
}