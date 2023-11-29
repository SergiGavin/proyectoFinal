package com.example.proyecto_final.entities;



import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Libros")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id_libros")
@Data
public class LibrosEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_libros")
	private Long id_libros;
	
	private String titulo;
	private String genero;
	private String autor;
	private Integer num_pag;
	private String estado;
	private Float valor;
	private String sinopsis;
	private String foto_portada;
	
	
	
	
	
	//Se indica la relacion OneToMany y se mappea--> "libroDonado" es el nombre de la variable de Donaciones 
	// que tiene un JoinColumn a idLibro de la BBDD. En el caso de "libroPrestado" lo mismo pero con Prestamos.

	@OneToMany(mappedBy = "libroDonado")
	//@JsonManagedReference
    private List<DonacionesEntity> donaciones_libros;

    @OneToMany(mappedBy = "libroPrestado")
   // @JsonManagedReference
    private List<PrestamosEntity> prestamos_libros;
	
	
	
}
