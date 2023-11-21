package com.example.proyecto_final.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Usuarios")
@Data
public class UsuariosEntities {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idUsuarios")
	int id;

	@Column(name = "Nombre")
	String nombre;
	
	@Column(name = "Apellidos")
	String apellidos;
	
	@Column(name = "DNI")
	String dni;
	
	@Column(name = "Correo_electronico")
	String correo;
	
	@Column(name = "Telefono")
	int telefono;
	
	@Column(name = "Saldo")
	String saldo;
		
}

