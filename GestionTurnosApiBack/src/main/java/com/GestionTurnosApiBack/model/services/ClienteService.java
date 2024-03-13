package com.GestionTurnosApiBack.model.services;

import com.GestionTurnosApiBack.model.entity.Cliente;

public interface ClienteService {
    
    Cliente buscarPorId(Long id);
    
    Cliente guardarCliente(Cliente cliente);
}
