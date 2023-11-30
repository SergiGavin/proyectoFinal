package com.example.proyecto_final.dtos;

import java.util.Date;

import com.example.proyecto_final.entities.DonacionesEntity;
import com.example.proyecto_final.entities.LibrosEntity;
import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.services.LibroService;
import com.example.proyecto_final.services.UsuarioService;

import lombok.Data;

@Data
public class DonacionesDTO {
	private Long idDonacion;
    private Date fechaDonacion;
    private UsuariosDTO usuarioDonante;
    private LibrosDTO libroDonado;
    private Long idUsuario; 
    private Long idLibro;
    
    public DonacionesDTO(DonacionesEntity donacionesEntity) {
        this.idDonacion = donacionesEntity.getId_donacion();
        this.fechaDonacion = donacionesEntity.getFecha_donacion();
        this.idUsuario = donacionesEntity.getId_usuarios() ; 
        this.idLibro = donacionesEntity.getId_libros();
        
        // Aquí deberías implementar la lógica para obtener la información del usuario desde UsuariosDTO
        // Supongamos que tienes un método en tu servicio para obtener UsuariosDTO por ID
        if (idUsuario != null) {
            this.usuarioDonante = obtenerUsuarioDTO(idUsuario);
        }
        if (idLibro != null) {
            this.libroDonado = obtenerLibroDTO(idLibro);
        }
    }

    private UsuariosDTO obtenerUsuarioDTO(Long idUsuario) {
    	UsuarioService u = new UsuarioService();
        UsuariosEntity usuariosEntity = u.obtenerUsuarioPorId(idUsuario);
        return new UsuariosDTO(usuariosEntity);
    }
    private LibrosDTO obtenerLibroDTO(Long idLibro) {
    	LibroService l = new LibroService();
        LibrosEntity librosEntity = l.obtenerLibroPorId(idLibro);
        return new LibrosDTO(librosEntity);
    }
}

