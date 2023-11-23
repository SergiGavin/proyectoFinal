package com.example.proyecto_final.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.proyecto_final.entities.LibrosEntity;

@Repository
public interface LibrosRepository extends JpaRepository <LibrosEntity, Long>{
	List<LibrosEntity> findByGenero(String genero);
	List<LibrosEntity> findByAutorContainingIgnoreCase(String autor);
}
