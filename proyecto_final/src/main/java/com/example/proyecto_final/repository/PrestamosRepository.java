package com.example.proyecto_final.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.proyecto_final.entities.PrestamosEntity;
import com.example.proyecto_final.entities.PrestamosKey;

@Repository
public interface PrestamosRepository extends JpaRepository <PrestamosEntity, PrestamosKey>{
	
}