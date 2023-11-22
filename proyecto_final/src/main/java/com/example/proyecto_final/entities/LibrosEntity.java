package com.example.proyecto_final.entities;



import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Libros")
@Data
public class LibrosEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_libros")
	private Long id_libros;
	
	@Column(name = "Titulo")
	private String titulo;

	@Column(name = "Genero")
	private String genero;

	@Column(name = "Autor")
	private String autor;

	@Column(name = "Num_pag")
	private int num_pag;

	@Column(name = "Estado")
	private String estado;
	
	@Column(name = "Valor")
	private Float valor;
	
	@Column(name = "sinopsis")
	private String sinopsis;
	
	@Column(name = "Foto_portada")
	private String foto_portada;
	
	
	
	
	
	//Se indica la relacion OneToMany y se mappea--> "libroDonado" es el nombre de la variable de Donaciones 
	// que tiene un JoinColumn a idLibro de la BBDD. En el caso de "libroPrestado" lo mismo pero con Prestamos.
		
	@OneToMany(mappedBy = "libroDonado")
    private List<DonacionesEntity> donaciones_libros;

    @OneToMany(mappedBy = "libroPrestado")
    private List<PrestamosEntity> prestamos_libros;
	
	
	
	
//	@ManyToMany(mappedBy = "usuarios")
//    private List<DonacionesEntity> donaciones;
	
//	@ManyToMany
//	  @JoinTable(
//	        name = "Prestamos",
//	        joinColumns = @JoinColumn(name = "Usuarios_idUsuarios", referencedColumnName = "idUsuarios"),
//	        inverseJoinColumns = @JoinColumn(name = "Libros_idLibros", referencedColumnName = "idLibros")
//	       
//	    )
//	  
//  private List<UsuariosEntity>usuariosPrestadores;
//	
////	@ManyToMany(mappedBy = "usuarios")
////	private List<PrestamosEntity> prestamos;
//	
//	@ManyToMany
//    @JoinTable(
//        name = "Donaciones",
//        joinColumns = @JoinColumn(name = "Usuarios_idUsuarios", referencedColumnName = "idUsuarios"),
//        inverseJoinColumns = @JoinColumn(name = "Libros_idLibros", referencedColumnName = "idLibros")
//    )
//    private List<UsuariosEntity> usuariosDonadores;
	
}
