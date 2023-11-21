import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
public class DonacionKey implements Serializable {
	@Getter @Setter
	@Column(name = "Usuarios_idUsuarios")
	Long idUsuarios;
	@Getter @Setter
	@Column(name = "Libros_idLibros")
	Long idLibros;
	
	public DonacionKey() {}
	
	public DonacionKey(Long idUsuarios, Long idLibros) {
		super();
		this.idUsuarios = idUsuarios;
		this.idLibros = idLibros;
	}

	@Override
	public int hashCode() {
		return Objects.hash(idLibros, idUsuarios);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DonacionKey other = (DonacionKey) obj;
		return Objects.equals(idLibros, other.idLibros) && Objects.equals(idUsuarios, other.idUsuarios);
	}
	
}
