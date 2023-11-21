package com.example.proyecto_final.entities;



import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Libros")
@Data
public class LibrosEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idLibros")
	private Long id;
	
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
	
	@Column(name = "Sinopsis")
	private String sinopsis;
	
	@Column(name = "Foto_portada")
	private String foto_portada;
	
	
	@ManyToMany(mappedBy = "usuario")
    private List<DonacionesEntity> donaciones;
	
	@ManyToMany(mappedBy = "usuario")
	private List<PrestamosEntity> prestamos;
	
}
