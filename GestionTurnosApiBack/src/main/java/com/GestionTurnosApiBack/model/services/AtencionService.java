package com.GestionTurnosApiBack.model.services;

import java.util.List;


import com.GestionTurnosApiBack.model.entity.*;

import reactor.core.publisher.Flux;

public interface AtencionService {
	
	void iniciarAtencion(Long idAtencion);
	void finalizarAtencion(Long idAtencion);
	Flux<List<Ticket>> obtenerTicketsPendientesYEnAtencionOrdenadosPorFecha();
	void cancelarAtencion(Long idAtencion);

}
