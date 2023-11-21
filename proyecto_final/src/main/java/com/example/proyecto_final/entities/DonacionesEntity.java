package com.example.proyecto_final.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
public class DonacionesEntity {
	@EmbeddedId
	private DonacionKey idDonacion;
	
    @ManyToMany
    @JoinTable(
    		name = "Usuarios_idUsuarios",
    		joinColumns = @JoinColumn(name = "donacion_id"),
            inverseJoinColumns = @JoinColumn(name = "libro_id"))
    private  List<UsuariosEntity> idUsuario;

    @ManyToMany
    @JoinTable(
        name = "Donaciones_Libros",
        joinColumns = @JoinColumn(name = "donacion_id"),
        inverseJoinColumns = @JoinColumn(name = "libro_id")
    )
    private List<LibrosEntity> idLibros;

    
    @Column(name = "Fecha_donacion")
    private Date fechaDonacion;
	
}
