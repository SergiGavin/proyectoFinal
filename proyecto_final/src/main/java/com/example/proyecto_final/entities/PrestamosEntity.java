package com.example.proyecto_final.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Prestamos")
@Data
public class PrestamosEntity {
	@Id
<<<<<<< HEAD
	private PrestamosKey idPrestamo;
=======
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPrestamo;
>>>>>>> origin
	
	 @Column(name = "Fecha_prestamo")
	    private Date fechaPrestamo;
	 
	 @ManyToOne
	 @JoinColumn(name = "idUsuarios")
	 private UsuariosEntity usuarioPrestatario;

	 @ManyToOne
	 @JoinColumn(name = "idLibros")
	 private LibrosEntity libroPrestado;
	 
	 
	 
	 
	
//    @ManyToMany
//    @JoinTable(
//    		name = "Usuarios_idUsuarios",
//    		joinColumns = @JoinColumn(name = "donacion_id"),
//    	    inverseJoinColumns = @JoinColumn(name = "libro_id")
//    )
//    private List<UsuariosEntity> idUsuario;
//
//    @ManyToMany
//    @JoinTable(
//    		name = "Libros_idLibros",
//    		joinColumns = @JoinColumn(name = "donacion_id"),
//            inverseJoinColumns = @JoinColumn(name = "libro_id"))
//    private List<LibrosEntity> idLibros;

   
}
