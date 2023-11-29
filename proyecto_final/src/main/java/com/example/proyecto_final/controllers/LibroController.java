package com.example.proyecto_final.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Random;

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

import com.example.proyecto_final.entities.LibrosEntity;
import com.example.proyecto_final.services.LibroService;

@RestController
@RequestMapping("/libros")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5500",
		"http://127.0.0.1:5500", "http://localhost:5173", "http://127.0.0.1:5173" })
public class LibroController {

	@Autowired
	private LibroService libroService;

	// GET
	@GetMapping
	public List<LibrosEntity> listarLibros() {
		return libroService.getAllLibros();
	}

	// GET para obtener un libro por ID
	// Si el id esta presente lo mostrará sino saldra mensaje de no encontrado.
	// Para ello utilizamos un placeHolder en el ResponseEntity
	@GetMapping("/{id}")
	public ResponseEntity<?> obtenerLibroPorId(@PathVariable Long id) {
		Optional<LibrosEntity> librosPorId = libroService.getLibroById(id);

		if (librosPorId.isPresent()) {
			return new ResponseEntity<>(librosPorId.get(), HttpStatus.OK);
		} else {
			String mensaje = "No se encontró ningún libro con el ID: " + id;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}
	
	private List<LibrosEntity> generarListaLibrosAleatorios(int capacidadLista, List<LibrosEntity> todosLosLibros) {
	    List<LibrosEntity> librosEnLista = new ArrayList<>(todosLosLibros);
	    List<LibrosEntity> librosAleatorios = new ArrayList<>();

	    Random random = new Random();

	    while (librosAleatorios.size() < capacidadLista && !librosEnLista.isEmpty()) {
	        // Generar un número aleatorio
	        int numRandom = random.nextInt(librosEnLista.size());

	        // Obtener el libro correspondiente al número aleatorio
	        LibrosEntity libroRandom = librosEnLista.get(numRandom);

	        // Añadir el libro a la lista de libros aleatorios
	        librosAleatorios.add(libroRandom);

	        // Eliminar el libro seleccionado de la lista de disponibles
	        librosEnLista.remove(libroRandom);
	    }

	    return librosAleatorios;
	}
	@GetMapping("/populares")
	public ResponseEntity<?> obtenerLibrosPopulares() {
	    List<LibrosEntity> todosLosLibros = libroService.getAllLibros();
	    List<LibrosEntity> librosPopulares = generarListaLibrosAleatorios(10, todosLosLibros);
	    return ResponseEntity.ok(librosPopulares);
	}

	@GetMapping("/disponibles")
	public ResponseEntity<?> obtenerLibrosDisponibles() {
	    List<LibrosEntity> todosLosLibros = libroService.getAllLibros();
	    List<LibrosEntity> librosDisponibles = new ArrayList<>(todosLosLibros);
	    List<LibrosEntity> librosDisponiblesAleatorios = generarListaLibrosAleatorios(10, librosDisponibles);
	    return ResponseEntity.ok(librosDisponiblesAleatorios);
	}

	@GetMapping("/recientes")
	public ResponseEntity<?> obtenerLibrosRecientes() {
	    List<LibrosEntity> todosLosLibros = libroService.getAllLibros();
	    List<LibrosEntity> librosRecientes = generarListaLibrosAleatorios(10, todosLosLibros);
	    return ResponseEntity.ok(librosRecientes);
	}

	
	


	// GET para obtener un libro por genero
	// Si el genero esta presente lo mostrará sino saldra mensaje de no encontrado.
	// Para ello utilizamos un placeHolder en el ResponseEntity
	@GetMapping("/genero/{genero}")
	public ResponseEntity<?> obtenerLibrosPorGenero(@PathVariable String genero) {
		List<LibrosEntity> librosPorGenero = libroService.getLibrosByGenero(genero);

		if (!librosPorGenero.isEmpty()) {
			return new ResponseEntity<>(librosPorGenero, HttpStatus.OK);
		} else {
			String mensaje = "No se encontraron libros para el género: " + genero;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}

	// GET para obtener un libro por autor
	// Si el autor esta presente lo mostrará sino saldra mensaje de no encontrado.
	// Si pones algo parecido al nombre te saldra. Ejemplo: J.K. Rowling la puedes
	// encontrar con "row"
	// Para ello utilizamos un placeHolder en el ResponseEntity
	@GetMapping("/autor/{autor}")
	public ResponseEntity<?> obtenerLibrosPorAutor(@PathVariable String autor) {
		if (autor != null) {
			autor = autor.trim();
		} else {
			// Manejar el caso en que autor es null, por ejemplo, asignar una cadena vacía o
			// devolver un error.
			return new ResponseEntity<>("Introduzca el autor", HttpStatus.BAD_REQUEST);
		}

		List<LibrosEntity> librosPorAutor = libroService.getLibrosByAutor(autor);

		if (!librosPorAutor.isEmpty()) {
			return new ResponseEntity<>(librosPorAutor, HttpStatus.OK);
		} else {
			String mensaje = "No se encontraron libros para el autor: " + autor;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}

	// MIRAR DE AÑADIR QUE NO SALGA LIBRO QUE HAYA TOMADO PRESTADO
	@GetMapping("/random")
	public ResponseEntity<?> obtenerLibroRandom() {
		List<LibrosEntity> todosLosLibros = libroService.getAllLibros();
		if (todosLosLibros.isEmpty()) {
			// Si no hay ningún libro en la bbdd, devolver un error not found
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		Random random = new Random();
		int idAleatorio = random.nextInt(todosLosLibros.size());
		LibrosEntity libroAleatorio = todosLosLibros.get(idAleatorio);

		return new ResponseEntity<>(libroAleatorio, HttpStatus.OK);
	}

	// Put
	@PutMapping
	public LibrosEntity crearLibro(@RequestBody LibrosEntity libro) {
		return libroService.createLibro(libro);
	}

	// Patch
	@PatchMapping("/{id}")
	// Pasamos como variable el id ya que se necesitará para editar el libro en
	// especifico.
	public ResponseEntity<?> actualizarLibro(@RequestBody LibrosEntity libro, @PathVariable Long id) {
		Optional<LibrosEntity> libroActualizar = libroService.getLibroById(id);
		if (libroActualizar.isPresent()) {
			LibrosEntity libroExistente = libroActualizar.get();
			if (libro.getTitulo() != null) {
				libroExistente.setTitulo(libro.getTitulo());
			}
			if (libro.getGenero() != null) {
				libroExistente.setGenero(libro.getGenero());
			}
			if (libro.getAutor() != null) {
				libroExistente.setAutor(libro.getAutor());
			}
			if (libro.getNum_pag() != null) {
				libroExistente.setNum_pag(libro.getNum_pag());
			}
			if (libro.getEstado() != null) {
				libroExistente.setEstado(libro.getEstado());
			}
			if (libro.getValor() != null) {
				libroExistente.setValor(libro.getValor());
			}
			if (libro.getSinopsis() != null) {
				libroExistente.setSinopsis(libro.getSinopsis());
			}
			LibrosEntity libroActualizado = libroService.updateLibro(libroExistente);
			return new ResponseEntity<>(libroActualizado, HttpStatus.OK);
		} else {
			String mensaje = "No se encontró ningún libro con el ID: " + id;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}

	// DELETE
	@DeleteMapping("/{id}")
	public void eliminarLibro(@PathVariable Long id) {
		libroService.deleteLibroById(id);
	}
}
