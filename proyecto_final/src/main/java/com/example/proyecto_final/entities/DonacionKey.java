package com.example.proyecto_final.entities;
import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
public class DonacionKey implements Serializable {
	@Getter @Setter
	@Column(name = "Usuarios_idUsuarios")
	Long idUsuarios;
	
	@Column(name = "Libros_idLibros")
	Long idLibros;

	public DonacionKey() {}
	
	public DonacionKey(Long idUsuarios, Long idLibros) {
		super();
		this.idUsuarios = idUsuarios;
		this.idLibros = idLibros;
	}
	
}
