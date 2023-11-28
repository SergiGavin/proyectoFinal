package com.example.proyecto_final.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000","http://localhost:5500" })
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	// GET
	@GetMapping
	public List<UsuariosEntity> listarUsuarios() {
		return usuarioService.getAllUsuarios();
	}

	// GET para obtener un usuario por ID
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

	// PUT
	@PutMapping
	public UsuariosEntity crearUsuario(@RequestBody UsuariosEntity usuario) {
		System.out.println("Datos del usuario recibidos: " + usuario.toString());
		return usuarioService.createUsuario(usuario);
	}

	// Patch
	@PatchMapping("/{id}")
	// Pasamos como variable el id ya que se necesitará para editar el usuario en
	// especifico.
	public ResponseEntity<?> actualizarPass(@RequestBody UsuariosEntity usuario, @PathVariable Long id) {
		Optional<UsuariosEntity> usuarioActualizar = usuarioService.getUsuarioById(id);
	    if (usuarioActualizar.isPresent()) {
	    	UsuariosEntity usuarioExistente = usuarioActualizar.get();
	    	if (usuario.getPass() != null) {
	    		usuarioExistente.setPass(usuario.getPass());
	    	}
	    //Para guardar en la bbdd
	    UsuariosEntity usuarioActualizado = usuarioService.updateUsuario(usuarioExistente);
	   
        return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
	    }else{
	    	 // Responder con un mensaje indicando que no se encontró el usuario
	        String mensaje = "No se encontró ningún usuario con el ID: " + id;
	        return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
	    }
	}

	// DELETE
	@DeleteMapping("/{id}")
	public void eliminarUsuario(@PathVariable Long id) {
		usuarioService.deleteUsuarioById(id);
	}
}
