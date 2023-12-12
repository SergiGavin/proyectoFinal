package com.example.proyecto_final.dtos;

import java.math.BigDecimal;

import com.example.proyecto_final.entities.UsuariosEntity;

import lombok.Data;

@Data
public class UsuariosDTO {
	private Long id_usuarios;
	private String nombre;
	private String apellidos;
	private String dni;
	private String correo;
	private Integer telefono;
	private BigDecimal saldo;
	private String username;
	private String pass;


public UsuariosDTO(UsuariosEntity usuariosEntity) {
    this.id_usuarios = usuariosEntity.getId_usuarios();
    this.nombre = usuariosEntity.getNombre();
    this.apellidos = usuariosEntity.getApellidos();
    this.dni = usuariosEntity.getDni();
    this.correo = usuariosEntity.getCorreo();
    this.telefono = usuariosEntity.getTelefono();
    this.saldo = usuariosEntity.getSaldo();
    this.username = usuariosEntity.getUsername();
    this.pass = usuariosEntity.getPass();
}
}
