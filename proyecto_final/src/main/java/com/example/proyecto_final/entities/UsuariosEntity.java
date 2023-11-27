package com.example.proyecto_final.entities;

import java.util.List;

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
@Data

public class UsuariosEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_usuarios")
	private Long id_usuarios;

	@Column(name = "Nombre")
	private String nombre;

	@Column(name = "Apellidos")
	private String apellidos;

	@Column(name = "DNI")
	private String dni;

	@Column(name = "Correo_electronico")
	private String correo;

	@Column(name = "Telefono")
	private int telefono;

	@Column(name = "Saldo")
	private String saldo;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "pass")
	private String pass;

	// Se indica la relacion OneToMany y se mappea--> "usuarioDonante" es el nombre
	// de la variable de Donaciones
	// que tiene un JoinColumn a idUsuarios de la BBDD. En el caso de
	// "usuarioPrestatario" lo mismo pero con Prestamos.
	@OneToMany(mappedBy = "usuarioDonante")
	private List<DonacionesEntity> donaciones_usuarios;

	@OneToMany(mappedBy = "usuarioPrestatario")
	private List<PrestamosEntity> prestamos_usuarios;

}
