package com.example.proyecto_final.entities;



import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "0.00")
    private BigDecimal valor;
	private String sinopsis;
	private String foto_portada;	
	private BigDecimal valor;
	private String sinopsis;
	private String foto_portada;
	public LibrosEntity () {}
	public LibrosEntity(String titulo, String genero, String autor, Integer num_pag, String estado) {
		super();
		this.titulo = titulo;
		this.genero = genero;
		this.autor = autor;
		this.num_pag = num_pag;
		this.estado = estado;
	}
	
}
