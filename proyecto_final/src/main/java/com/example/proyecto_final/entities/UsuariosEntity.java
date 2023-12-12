package com.example.proyecto_final.entities;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	private BigDecimal saldo;
	private String username;
	private String pass;
	
	public UsuariosEntity() {}
	 
	public UsuariosEntity(String nombre, String apellidos, String dni, String correo, Integer telefono, String saldo,
			String username, String pass) {
		super();
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.dni = dni;
		this.correo = correo;
		this.telefono = telefono;
		this.saldo = saldo;
		this.username = username;
		this.pass = pass;
	}

}
