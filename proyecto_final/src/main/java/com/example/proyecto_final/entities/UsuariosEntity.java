package com.example.proyecto_final.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerator;
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
@Table(name = "Usuarios")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id_usuarios")
@Data

public class UsuariosEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuarios")
	private Long id_usuarios;
	private String nombre;
	private String apellidos;
	private String dni;
	
	@Column(name = "Correo_electronico")
	private String correo;
	
	private Integer telefono;
	private String saldo;
	private String username;
	private String pass;

	// Se indica la relacion OneToMany y se mappea--> "usuarioDonante" es el nombre
	// de la variable de Donaciones
	// que tiene un JoinColumn a idUsuarios de la BBDD. En el caso de
	// "usuarioPrestatario" lo mismo pero con Prestamos.
	@OneToMany(mappedBy = "usuarioDonante")
	//@JsonManagedReference
	private List<DonacionesEntity> donaciones_usuarios;

	@OneToMany(mappedBy = "usuarioPrestatario")
	//@JsonManagedReference
	private List<PrestamosEntity> prestamos_usuarios;

}
