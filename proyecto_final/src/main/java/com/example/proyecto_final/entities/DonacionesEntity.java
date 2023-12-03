package com.example.proyecto_final.entities;

import java.util.Date;

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
public class DonacionesEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_donacion;
	@Column (name = "Fecha_donacion")
	private Date fecha_donacion;
	private Long id_usuarios;
	private Long id_libros;
}
