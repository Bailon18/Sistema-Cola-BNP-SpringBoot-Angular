package com.GestionTurnosApiBack.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GestionTurnosApiBack.model.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
