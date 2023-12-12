package com.example.proyecto_final.controllers;

import java.math.BigDecimal;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.LibrosEntity;
import com.example.proyecto_final.entities.UsuariosEntity;
import com.example.proyecto_final.services.UsuarioService;


@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequestMapping("/usuarios")
//@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000","http://localhost:5500", "http://127.0.0.1:5500","http://localhost:5173","http://127.0.0.1:5173" })

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
	@GetMapping("/saldo/{id}")
	public ResponseEntity<?> obtenerUsuarioSoloSaldo(@PathVariable Long id) {
		Optional<UsuariosEntity> usuarioPorId = usuarioService.getUsuarioById(id);
		if (usuarioPorId.isPresent()) {
			 BigDecimal saldo = usuarioPorId.get().getSaldo();
			return new ResponseEntity<>(saldo, HttpStatus.OK);
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
	@PutMapping("/{id}")
	public UsuariosEntity actualizarUser(@RequestBody UsuariosEntity usuario, @PathVariable Long id) {
	    Optional<UsuariosEntity> usuarioActualizar = usuarioService.getUsuarioById(id);

	    return usuarioService.updateUsuario(usuario);
	}
	
	@PutMapping("/saldo/{id}")
	public UsuariosEntity actualizarUserSaldo(@RequestBody UsuariosEntity usuario, @PathVariable Long id) {
	    Optional<UsuariosEntity> usuarioActualizar = usuarioService.getUsuarioById(id);
	    
	    return usuarioService.updateUsuario(usuario);
	}
	   /* if (usuarioActualizar.isPresent()) {
	        UsuariosEntity usuarioExistente = usuarioActualizar.get();

	        if (usuario.getPass() != null) {
	            usuarioExistente.setPass(usuario.getPass());
	        }

	        // Obtener la donación por usuario
	        Optional<DonacionesEntity> donacionOptional = donacionService.obtenerDonacionPorUsuario(usuarioExistente);

	        if (donacionOptional.isPresent()) {
	            DonacionesEntity donacion = donacionOptional.get();

	            // Obtener el LibrosEntity asociado a la donación
	            Long idLibro = donacion.getId_libros();

	            // Get LibrosEntity from LibroService
	            LibrosEntity libro = libroService.getLibroById(idLibro)
	                    .orElseThrow(() -> new RuntimeException("Libro not found for ID: " + idLibro));

	            // Calcular el valor de la donación utilizando el nuevo método
	            BigDecimal valorDonacion = calcularValorDonacion(libro);

	            // Actualizar el saldo del usuario sumando el valor de la donación
	            BigDecimal saldoNuevo = usuarioExistente.getSaldo().add(valorDonacion);
	            usuarioExistente.setSaldo(saldoNuevo);
	            System.out.print("Usuario existente: " + usuarioExistente);
	            // Guardar el usuario actualizado en la base de datos
	            UsuariosEntity usuarioActualizado = usuarioService.updateUsuario(usuarioExistente);

	            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
	        } else {
	            // Manejar el caso en que no hay donación para el usuario
	            return new ResponseEntity<>("No se encontró ninguna donación para el usuario con ID: " + id, HttpStatus.NOT_FOUND);
	        }
	    } else {
	        // Responder con un mensaje indicando que no se encontró el usuario
	        String mensaje = "No se encontró ningún usuario con el ID: " + id;
	        return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
	    }
	}*/
	

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
        		  return ResponseEntity.ok().body(usuarioEncontrado);
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
    
  /*  @PatchMapping("/updatesaldo/{id}")
    public ResponseEntity<?> actualizarSaldo(@RequestBody UsuariosEntity usuario, @PathVariable Long id) {
        Optional<UsuariosEntity> usuarioActualizar = usuarioService.getUsuarioById(id);
        if (usuarioActualizar.isPresent()) {
            UsuariosEntity usuarioExistente = usuarioActualizar.get();
            if (usuario.getSaldo() != null) {
                usuarioExistente.setSaldo(usuario.getSaldo());
            }

            // Guardar en la base de datos
            UsuariosEntity usuarioActualizado = usuarioService.updateUsuario(usuarioExistente);

            return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
        } else {
            // Responder con un mensaje indicando que no se encontró el usuario
            String mensaje = "No se encontró ningún usuario con el ID: " + id;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }
    }*/
    private BigDecimal calcularValorDonacion(LibrosEntity libro) {
        return calcularPrecio(libro.getNum_pag(), libro.getEstado());
    }
	public BigDecimal calcularPrecio(int paginas, String estado) {
	    // Coeficientes para el cálculo
	    BigDecimal factorPaginas = new BigDecimal("0.03");
	    BigDecimal factorEstado = obtenerFactorEstado(estado);

	    // Calcula el precio sin el factor de antigüedad
	    BigDecimal precio = BigDecimal.valueOf(paginas)
	            .multiply(factorPaginas)
	            .multiply(factorEstado);

	    return precio;
	}

	public BigDecimal obtenerFactorEstado(String estado) {
	    switch (estado.toLowerCase()) {
	        case "malo":
	            return BigDecimal.ONE;
	        case "decente":
	            return new BigDecimal("1.1");
	        case "bueno":
	            return new BigDecimal("1.2");
	        default:
	            return BigDecimal.ONE;
	    }
	}
	
}
