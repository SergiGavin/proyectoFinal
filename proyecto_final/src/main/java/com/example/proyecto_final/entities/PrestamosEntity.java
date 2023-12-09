package com.example.proyecto_final.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	private Long id_libros;
	public PrestamosEntity() {}
	
	public PrestamosEntity(Date fechaDevolucion, Long id_usuarios, Long id_libros) {
		super();
		this.fechaDevolucion = fechaDevolucion;
		this.id_usuarios = id_usuarios;
		this.id_libros = id_libros;
	}
	 
   
}
