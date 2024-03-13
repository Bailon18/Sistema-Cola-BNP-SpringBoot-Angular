package com.GestionTurnosApiBack.model.services;

import com.GestionTurnosApiBack.model.entity.Ticket;

public interface TicketService {
    
    Ticket generarTicket(Ticket ticket);
    
    Ticket buscarPorId(Long id);
    
    void cambiarEstadoTicket(Long id, String nuevoEstado);
}
