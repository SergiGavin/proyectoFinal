package com.example.proyecto_final.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.repository.UsuariosRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuariosRepository usuariosRepository;
	
	//Mostrar usuarios
	public List<UsuariosEntity> getAllUsuarios(){
		return usuariosRepository.findAll();
	}
	
	//Crear un usuario 
	public UsuariosEntity createUsuario(UsuariosEntity usuario) {
		return usuariosRepository.save(usuario);
	}
	
	//Editar usuario --> el codigo es igual que el crear pero en este caso como ya habrá un ID existente de ese usuario
	// en vez de crearlo, lo actualizará.
	public UsuariosEntity updateUsuario(UsuariosEntity usuario) {
		return usuariosRepository.save(usuario);
	}
	
	//Eliminar usuario
	public void deleteUsuarioById(Long id) {
		usuariosRepository.deleteById(id);
	}

}
