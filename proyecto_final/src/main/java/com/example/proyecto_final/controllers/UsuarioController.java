package com.example.proyecto_final.controllers;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.services.UsuarioService;


@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000","http://localhost:5500", "http://127.0.0.1:5500","http://localhost:5173","http://127.0.0.1:5173" })
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
		Optional<UsuariosEntity> usuarioPorId = usuarioService.getUsuarioById(id);
		if (usuarioPorId.isPresent()) {
			return new ResponseEntity<>(usuarioPorId.get(), HttpStatus.OK);
		} else {
			String mensaje = "No se encontró ningún usuario con el ID: " + id;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}
	
	
	// PUT
	@PutMapping
	public UsuariosEntity crearUsuario(@RequestBody UsuariosEntity usuario) {
		System.out.println("Datos del usuario recibidos: " + usuario.toString());
		UsuariosEntity newUsuario = new UsuariosEntity(
				usuario.getNombre(),
				usuario.getApellidos(),
				usuario.getDni(),
				usuario.getCorreo(),
				usuario.getTelefono(),
				usuario.getSaldo(),
				usuario.getUsername(),
				encryptPassword(usuario.getPass()));
		
		return usuarioService.createUsuario(newUsuario);

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
	
	

		
	@PostMapping("/iniciarsesion")
    public ResponseEntity<?> iniciarSesion(@RequestBody UsuariosEntity usuario) {
        // Obtener usuario por nombre de usuario
        Optional<UsuariosEntity> usuarioExistente = usuarioService.obtenerUsuarioPorNombre(usuario.getUsername());
      
        if (usuarioExistente.isPresent()) {
            // Verificar la contraseña
        	UsuariosEntity usuarioEncontrado = usuarioExistente.get();
        	  System.out.println(usuarioEncontrado.getUsername());        	
        	  System.out.println("Hash que tenemos almacenado en la base de datos: " + usuarioEncontrado.getPass());
        	  System.out.println(usuario.getUsername());
        	  System.out.println("Contraseña recibida desde el cliente: " + usuario.getPass());
        	  String pass = encryptPassword(usuario.getPass());
        	  System.out.println("Hash cifrado en el back: " + pass);
        	  if (usuarioEncontrado.getPass().equals(pass)) {
        		  return ResponseEntity.ok(usuarioEncontrado);
        	  } else {
        		  return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{'status': 'error', 'message': 'Datos incorrectos'}");
        	  }
        } else {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{'status': 'error', 'message': 'Usuario no encontrado'}");
        }
    }
	
	@PutMapping("/registro")
	public ResponseEntity<String> registro(@RequestBody UsuariosEntity usuario) {
		System.out.println("Datos recibidos: " + usuario.toString());
		Optional<UsuariosEntity> usuarioExistentePorNombre = usuarioService.obtenerUsuarioPorNombre(usuario.getUsername());
	    Optional<UsuariosEntity> usuarioExistentePorCorreo = usuarioService.obtenerUsuarioPorCorreo(usuario.getCorreo());
	    Optional<UsuariosEntity> usuarioExistentePorDNI = usuarioService.obtenerUsuarioPorDNI(usuario.getDni());
	    if (usuarioExistentePorNombre.isPresent() || usuarioExistentePorCorreo.isPresent()|| usuarioExistentePorDNI.isPresent()) {
	        return ResponseEntity.status(HttpStatus.CONFLICT).body("{'status': 'error', 'message': 'El nombre de usuario, el correo electrónico o el DNI ya están registrados'}");
	    }else{
	    	crearUsuario(usuario);
	    	return ResponseEntity.ok("{'status': 'success', 'message': 'Registro exitoso', 'usuario': " + usuario.toString() + "}");
	    }
	}
	
	// Función para cifrar la contraseña con SHA-256
    public static String encryptPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder(2 * encodedHash.length);
            for (byte b : encodedHash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
	
}
