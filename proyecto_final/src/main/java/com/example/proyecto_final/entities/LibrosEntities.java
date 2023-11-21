package com.example.proyecto_final.entities;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Libros")
@Data
public class LibrosEntities {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idLibros")
	int id;
	
	@Column(name = "Titulo")
	String titulo;

	@Column(name = "Genero")
	String genero;

	@Column(name = "Autor")
	String autor;

	@Column(name = "Num_pag")
	int num_pag;

	@Column(name = "Estado")
	String estado;
	
	@Column(name = "Valor")
	Float valor;
	
	@Column(name = "Sinopsis")
	String sinopsis;
	
}
