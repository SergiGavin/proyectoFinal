package com.example.proyecto_final.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.proyecto_final.entities.DonacionKey;
import com.example.proyecto_final.entities.DonacionesEntity;


@Repository
public interface DonacionesRepository extends JpaRepository <DonacionesEntity, DonacionKey>{
	
}
