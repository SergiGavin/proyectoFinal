package com.example.proyecto_final.dtos;

import java.util.Date;

import com.example.proyecto_final.entities.PrestamosEntity;
import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.services.UsuarioService;

import lombok.Data;

@Data
public class PrestamosDTO {
    private Long idPrestamo;
    private Date fechaPrestamo;
    private Date fechaDevolucion;
    private UsuariosDTO usuarioPrestatario;
    private Long idUsuario;  // Asegúrate de tener un campo para el ID del usuario en PrestamosEntity

    public PrestamosDTO(PrestamosEntity prestamosEntity) {
        this.idPrestamo = prestamosEntity.getIdPrestamo();
        this.fechaPrestamo = prestamosEntity.getFechaPrestamo();
        this.fechaDevolucion = prestamosEntity.getFechaDevolucion();
        this.idUsuario = prestamosEntity.getId_usuarios();  // Ajusta según la estructura real de PrestamosEntity

        // Aquí deberías implementar la lógica para obtener la información del usuario desde UsuariosDTO
        // Supongamos que tienes un método en tu servicio para obtener UsuariosDTO por ID
        if (idUsuario != null) {
            this.usuarioPrestatario = obtenerUsuarioDTO(idUsuario);
        }
    }

    private UsuariosDTO obtenerUsuarioDTO(Long idUsuario) {
    	UsuarioService u = new UsuarioService();
        UsuariosEntity usuariosEntity = u.obtenerUsuarioPorId(idUsuario);
        return new UsuariosDTO(usuariosEntity);
    }
}