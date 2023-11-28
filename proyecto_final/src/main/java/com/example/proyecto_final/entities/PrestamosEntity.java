package com.example.proyecto_final.entities;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    private Long idPrestamo;
	
	 @Column(name = "Fecha_prestamo")
	    private Date fechaPrestamo;
	 @Column(name = "Fecha_devolucion")
	    private Date fechaDevolucion;
	 
	 @JsonIgnore
	 @ManyToOne
	 @JoinColumn(name = "id_usuarios")
	 private UsuariosEntity usuarioPrestatario;
	 
	 @JsonIgnore
	 @ManyToOne
	 @JoinColumn(name = "id_libros")
	 private LibrosEntity libroPrestado;
	 
   
}
