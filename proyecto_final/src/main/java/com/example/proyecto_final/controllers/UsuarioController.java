package com.example.proyecto_final.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.services.UsuarioService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("swap-reads/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	
	//GET
	@GetMapping
	public List<UsuariosEntity> listarUsuarios(){
		return usuarioService.getAllUsuarios();
	}
	
	//POST
	@PostMapping
	public UsuariosEntity crearUsuario(@RequestBody UsuariosEntity usuario) {
		return usuarioService.createUsuario(usuario);
	}
	
	//PUT
	@PostMapping("editar/{id}")
	//Pasamos como variable el id ya que se necesitará para editar el usuario en especifico.
	public UsuariosEntity actualizar(@RequestBody UsuariosEntity usuario, @PathVariable Long id) {
		usuario.setIdUsuarios(id);
		return usuarioService.updateUsuario(usuario);
	}
	//DELETE
	@DeleteMapping("eliminar/{id}")
	public void eliminar(@PathVariable Long id) {
		usuarioService.deleteUsuarioById(id);
	}
}
