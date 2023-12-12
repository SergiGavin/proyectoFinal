package com.example.proyecto_final.entities;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "Donaciones")
@Data
public class DonacionesEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_donacion;
	@Column (name = "Fecha_donacion")
	private Date fecha_donacion;
	private Long id_usuarios;
	private Long id_libros;
	public DonacionesEntity () {}
	
	
	public DonacionesEntity(Long id_usuarios, Long id_libros) {
		super();
		this.id_usuarios = id_usuarios;
		this.id_libros = id_libros;
		
		
	}
	
	
}
