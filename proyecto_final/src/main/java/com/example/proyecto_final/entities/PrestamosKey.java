package com.example.proyecto_final.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class PrestamosKey implements Serializable {

	@Column(name = "Usuarios_idUsuarios")
	Long idUsuarios;
	
	@Column(name = "Libros_idLibros")
	Long idLibros;

	public PrestamosKey() {}
	
	public PrestamosKey(Long idUsuarios, Long idLibros) {
		super();
		this.idUsuarios = idUsuarios;
		this.idLibros = idLibros;
	}

	@Override
	public int hashCode() {
		return Objects.hash(idLibros, idUsuarios);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PrestamosKey other = (PrestamosKey) obj;
		return Objects.equals(idLibros, other.idLibros) && Objects.equals(idUsuarios, other.idUsuarios);
	}
	
	
}
