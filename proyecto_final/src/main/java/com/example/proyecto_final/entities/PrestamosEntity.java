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
@Table(name = "Prestamos")
@Data
public class PrestamosEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//UsuarioIdDTO usuarioIdDTO = new UsuarioIdDTO();
	private Long idPrestamo;

	@Column(name = "Fecha_prestamo")
	private Date fechaPrestamo;
	@Column(name = "Fecha_devolucion")
	private Date fechaDevolucion;
	private Long id_usuarios;

}
