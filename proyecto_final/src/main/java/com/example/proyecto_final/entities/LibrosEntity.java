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
	
	
	
}
