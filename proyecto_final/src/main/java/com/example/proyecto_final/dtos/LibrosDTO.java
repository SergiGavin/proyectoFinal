package com.example.proyecto_final.dtos;

import java.math.BigDecimal;

import com.example.proyecto_final.entities.LibrosEntity;

import lombok.Data;

@Data
public class LibrosDTO {
	private Long id_libros;
	private String titulo;
	private String genero;
	private String autor;
	private Integer num_pag;
	private String estado;
	private BigDecimal valor;
	private String sinopsis;
	private String foto_portada;
	
	public LibrosDTO(LibrosEntity librosEntity) {
	    this.id_libros = librosEntity.getId_libros();
	    this.titulo = librosEntity.getTitulo();
	    this.genero = librosEntity.getGenero();
	    this.autor = librosEntity.getAutor();
	    this.num_pag = librosEntity.getNum_pag();
	    this.estado = librosEntity.getEstado();
	    this.valor = librosEntity.getValor();
	    this.sinopsis = librosEntity.getSinopsis();
	    this.foto_portada = librosEntity.getFoto_portada();
	}
}