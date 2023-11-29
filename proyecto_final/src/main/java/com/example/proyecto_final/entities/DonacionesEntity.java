package com.example.proyecto_final.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Donaciones")
@Data
public class DonacionesEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_prestamo;
	@Column (name = "Fecha_prestamo")
	private Date fecha_prestamo;
	@Column (name = "Fecha_devolucion")
	private Date fecha_devolucion;
	
//    private Long idDonacion;
	
//	   @Column(name = "Fecha_donacion")
//	    private Date fechaDonacion;
	   
	   //Se relaciona con ManyToOne y se hace un JoinColumn a "idUsuarios". El mismo procedimiento con "idLibros"
	   	@ManyToOne
	    @JoinColumn(name = "id_usuarios")
	   	//@JsonBackReference
	    private UsuariosEntity usuarioDonante;
//
//	    @ManyToOne
//	    @JoinColumn(name = "id_libros")
//	    //@JsonBackReference
//	    private LibrosEntity libroDonado;
	   
	
//    @ManyToMany
//    @JoinTable(
//    		name = "Usuarios_idUsuarios",
//    		joinColumns = @JoinColumn(name = "donacion_id"),
//            inverseJoinColumns = @JoinColumn(name = "libro_id"))
//    private  List<UsuariosEntity> idUsuario;
//
//    @ManyToMany
//    @JoinTable(
//        name = "Donaciones_Libros",
//        joinColumns = @JoinColumn(name = "donacion_id"),
//        inverseJoinColumns = @JoinColumn(name = "libro_id")
//    )
//    private List<LibrosEntity> idLibros;

    
 
	
}
