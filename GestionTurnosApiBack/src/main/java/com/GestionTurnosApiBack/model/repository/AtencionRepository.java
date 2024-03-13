package com.GestionTurnosApiBack.model.repository;

import com.GestionTurnosApiBack.model.entity.Atencion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AtencionRepository extends JpaRepository<Atencion, Long> {
   
}
