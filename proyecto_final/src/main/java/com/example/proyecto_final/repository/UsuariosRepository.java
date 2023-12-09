package com.example.proyecto_final.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.proyecto_final.entities.UsuariosEntity;

@Repository
public interface UsuariosRepository extends JpaRepository<UsuariosEntity, Long> {
	 Optional<UsuariosEntity> findByUsername(String username);
	 Optional<UsuariosEntity> findByCorreo(String correo);
	 Optional<UsuariosEntity> findByDni(String dni);
}
