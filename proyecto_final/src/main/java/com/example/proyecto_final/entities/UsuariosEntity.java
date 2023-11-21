package com.example.proyecto_final.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Usuarios")
@Data
public class UsuariosEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idUsuarios")
	private Long id;

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
		
	  @ManyToMany
	  @JoinTable(
	        name = "Prestamos",
	        joinColumns = @JoinColumn(name = "Usuarios_idUsuarios", referencedColumnName = "idUsuarios"),
	        inverseJoinColumns = @JoinColumn(name = "Libros_idLibros", referencedColumnName = "idLibros")
	       
	    )
	  
    private List<LibrosEntity> librosPrestados;
	  
	  @ManyToMany
	    @JoinTable(
	        name = "Donaciones",
	        joinColumns = @JoinColumn(name = "Usuarios_idUsuarios", referencedColumnName = "idUsuarios"),
	        inverseJoinColumns = @JoinColumn(name = "Libros_idLibros", referencedColumnName = "idLibros")
	    )
	    private List<LibrosEntity> librosDonados;
    
}

