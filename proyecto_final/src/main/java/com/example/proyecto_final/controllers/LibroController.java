package com.example.proyecto_final.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.LibrosEntity;
import com.example.proyecto_final.services.LibroService;


@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})

@RequestMapping("/libros")
//@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5500",
	//	"http://127.0.0.1:5500", "http://localhost:5173", "http://127.0.0.1:5173" })

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

	
	@GetMapping("/populares")
	public ResponseEntity<?> obtenerLibrosPopulares() {
		List<Long> idsPopulares = Arrays.asList(1L, 5L, 6L, 8L, 9L, 11L, 16L, 12L, 17L, 2L);
		List<LibrosEntity> librosPopulares = obtenerLibrosPorIds(idsPopulares);
		return ResponseEntity.ok(librosPopulares);
	}

	@GetMapping("/disponibles")
	public ResponseEntity<?> obtenerLibrosDisponibles() {
		List<Long> idsDisponibles = Arrays.asList(3L, 4L, 7L, 10L, 13L, 14L, 15L, 18L, 19L, 20L);
		List<LibrosEntity> librosDisponibles = obtenerLibrosPorIds(idsDisponibles);
		return ResponseEntity.ok(librosDisponibles);
	}

	@GetMapping("/recientes")
	public ResponseEntity<?> obtenerLibrosRecientes() {
		List<LibrosEntity> todosLosLibros = libroService.getAllLibros();
		List<LibrosEntity> librosRecientes = todosLosLibros.subList(todosLosLibros.size() - 10, todosLosLibros.size());
		return ResponseEntity.ok(librosRecientes);
	}
	private List<LibrosEntity> obtenerLibrosPorIds(List<Long> ids) {
	    List<LibrosEntity> libros = new ArrayList<>();
	    for (Long id : ids) {
	        Optional<LibrosEntity> libro = libroService.getLibroById(id);
	        libro.ifPresent(libros::add);
	    }
	    return libros;
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
	
	@GetMapping("/titulo/{titulo}")
    public ResponseEntity<?> obtenerLibrosPorTitulo(@PathVariable String titulo) {
        if (titulo != null) {
            titulo = titulo.trim();
        } else {
            return new ResponseEntity<>("Introduzca el título", HttpStatus.BAD_REQUEST);
        }

        List<LibrosEntity> librosPorTitulo = libroService.getLibrosByTitulo(titulo);

        if (!librosPorTitulo.isEmpty()) {
            return new ResponseEntity<>(librosPorTitulo, HttpStatus.OK);
        } else {
            String mensaje = "No se encontraron libros para el título: " + titulo;
            return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
        }
    }

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
	@GetMapping("/tituloautor/{titulo}/{autor}")
	public ResponseEntity<?> buscarLibros(
	        @PathVariable(name = "titulo", required = false) String titulo,
	        @PathVariable(name = "autor", required = false) String autor) {

	    // Si ambos parámetros son nulos, puedes devolver un error
	    if (titulo == null && autor == null) {
	        return new ResponseEntity<>("Introduzca al menos el título o el autor", HttpStatus.BAD_REQUEST);
	    }

	    // Tratar cadenas nulas como cadenas vacías para evitar problemas en la búsqueda
	    if (titulo != null) {
	        titulo = titulo.trim();
	    }

	    if (autor != null) {
	        autor = autor.trim();
	    }

	    // Lógica de búsqueda en el servicio
	    List<LibrosEntity> resultadosPorTitulo = new ArrayList<>();
	    List<LibrosEntity> resultadosPorAutor = new ArrayList<>();

	    if (titulo != null) {
	        resultadosPorTitulo = libroService.getLibrosByTitulo(titulo);
	    }

	    if (autor != null) {
	        resultadosPorAutor = libroService.getLibrosByAutor(autor);
	    }

	    // Puedes combinar o procesar los resultados según tus necesidades

	    Map<String, List<LibrosEntity>> resultados = new HashMap<>();
	    resultados.put("titulo", resultadosPorTitulo);
	    resultados.put("autor", resultadosPorAutor);

	    return new ResponseEntity<>(resultados, HttpStatus.OK);
	}

	// Put
	@PutMapping
	public LibrosEntity crearLibro(@RequestBody LibrosEntity libro) {
		LibrosEntity newLibro = new LibrosEntity(
				libro.getTitulo(),
				libro.getGenero(),
				libro.getAutor(),
				libro.getNum_pag(),
				libro.getEstado(),
				libro.getFoto_portada()
				); 
		BigDecimal precioInicial = calcularPrecio(libro.getNum_pag(), libro.getEstado());
		BigDecimal factorDescuento = new BigDecimal("0.67");
		BigDecimal precioConDescuento = precioInicial.multiply(factorDescuento);
	    newLibro.setValor(precioConDescuento);
		
		System.out.println("Datos del libro creado:  "+newLibro.toString());
		return libroService.createLibro(newLibro);
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
