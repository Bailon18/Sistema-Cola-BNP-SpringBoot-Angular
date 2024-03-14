package com.GestionTurnosApiBack.model.repository;

import com.GestionTurnosApiBack.model.entity.Modulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.*;

public interface ModuloRepository extends JpaRepository<Modulo, Long> {

	    @Transactional
	    @Modifying
	    @Query(value = "INSERT INTO servicios_modulos (id_modulo, id_servicio) VALUES (:idModulo, :idServicio)", nativeQuery = true)
	    void agregarServicioAModulo(Long idModulo, Long idServicio);
}
