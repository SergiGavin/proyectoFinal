package com.example.proyecto_final.DTO;
import java.util.Date;

import lombok.Data;

@Data
//Clase creada para usar el Data Transfer Object, para así gestionar la informacion enviada
// en el json al tener recursion infinita
public class PrestamoDTO {
	private Long idPrestamo;
    private Date fechaPrestamo;
    private Date fechaDevolucion;
    private Long idUsuario;
    private Long idLibro;
}
