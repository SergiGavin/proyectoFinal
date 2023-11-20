package com.example.proyecto_final.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "Donaciones")
@Data
public class Donaciones {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Usuarios_idUsuarios")
	int idUsuario;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Libros_idLibros")
	int idLibro;
	
}
