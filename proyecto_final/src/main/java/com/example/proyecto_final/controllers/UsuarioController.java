package com.example.proyecto_final.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.LibrosEntity;
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
	// GET para obtener un libro por ID
	// Si el id esta presente lo mostrará sino saldra mensaje de no encontrado.
	// Para ello utilizamos un placeHolder en el ResponseEntity
	@GetMapping("/{id}")
	public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable Long id) {
		Optional<UsuariosEntity> usuarioOptional = usuarioService.getUsuarioById(id);
		if (usuarioOptional.isPresent()) {
			return new ResponseEntity<>(usuarioOptional.get(), HttpStatus.OK);
		} else {
		String mensaje = "No se encontró ningún usuario con el ID: " + id;
		return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);                        
		}
	}
	
	//POST
	@PostMapping
	public UsuariosEntity crearUsuario(@RequestBody UsuariosEntity usuario) {
		return usuarioService.createUsuario(usuario);
	}
	
	//PUT
	@PostMapping("editar/{id}")
	//Pasamos como variable el id ya que se necesitará para editar el usuario en especifico.

	public UsuariosEntity actualizarUsuario(@RequestBody UsuariosEntity usuario, @PathVariable Long id) {
		usuario.setId_usuarios(id);
		return usuarioService.updateUsuario(usuario);
	}
	//DELETE
	@DeleteMapping("eliminar/{id}")
	public void eliminarUsuario(@PathVariable Long id) {
		usuarioService.deleteUsuarioById(id);
	}
}
