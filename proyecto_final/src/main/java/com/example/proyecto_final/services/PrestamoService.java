package com.example.proyecto_final.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proyecto_final.DTO.PrestamoDTO;
import com.example.proyecto_final.entities.PrestamosEntity;
import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.repository.PrestamosRepository;

@Service
public class PrestamoService {

	@Autowired
	private PrestamosRepository prestamosRepository;

	// Mostrar prestamos
	public List<PrestamoDTO> getAllPrestamos() {
		List<PrestamosEntity> prestamosEntities = prestamosRepository.findAll();
		return prestamosEntities.stream().map(this::prestamoToDTO).collect(Collectors.toList());
	}
	public Optional<PrestamosEntity> getPrestamosById(Long id) {
		return prestamosRepository.findById(id);
	}
	/*
	  public List<PrestamoDTO> getPrestamosByUsuarioId(Long idUsuario) {
	        List<PrestamosEntity> prestamosEntities = prestamosRepository.findByUsuarioPrestatarioId(idUsuario);
	        return prestamosEntities.stream().map(this::prestamoToDTO).collect(Collectors.toList());
	  }
*/
	// Crear un prestamo
	public PrestamosEntity createPrestamo(PrestamosEntity prestamo) {
		return prestamosRepository.save(prestamo);
	}

	// Editar prestamo --> el codigo es igual que el crear pero en este caso como ya
	// habrá un ID existente de ese prestamo
	// en vez de crearlo, lo actualizará.
	public PrestamosEntity updatePrestamo(PrestamosEntity prestamo) {
		return prestamosRepository.save(prestamo);
	}

	// Eliminar prestamo
	public void deletePrestamoById(Long id) {
		prestamosRepository.deleteById(id);
	}

	public PrestamoDTO prestamoToDTO(PrestamosEntity prestamoEntity) {
		PrestamoDTO prestamoDTO = new PrestamoDTO();
		prestamoDTO.setIdPrestamo(prestamoEntity.getIdPrestamo());
		prestamoDTO.setFechaPrestamo(prestamoEntity.getFechaPrestamo());
		prestamoDTO.setFechaDevolucion(prestamoEntity.getFechaDevolucion());
		prestamoDTO.setIdUsuario(prestamoEntity.getUsuarioPrestatario().getId_usuarios());
		prestamoDTO.setIdLibro(prestamoEntity.getLibroPrestado().getId_libros());

		return prestamoDTO;
	}
	   // Método adicional para convertir a un DTO más simple con solo IDs
    public PrestamoDTO prestamoIdsToDTO(PrestamosEntity prestamoEntity) {
        PrestamoDTO prestamoDTO = new PrestamoDTO();
        prestamoDTO.setIdPrestamo(prestamoEntity.getIdPrestamo());
        prestamoDTO.setIdUsuario(prestamoEntity.getUsuarioPrestatario().getId_usuarios());
        prestamoDTO.setIdLibro(prestamoEntity.getLibroPrestado().getId_libros());

        return prestamoDTO;
    }

}
