package com.GestionTurnosApiBack.model.services.impl;

import java.util.List;

import com.GestionTurnosApiBack.model.entity.Atencion;
import com.GestionTurnosApiBack.model.entity.Ticket;
import com.GestionTurnosApiBack.model.repository.*;
import com.GestionTurnosApiBack.model.services.AtencionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;



import java.sql.Timestamp;
import java.time.Duration;

@Service
public class AtencionServiceImpl implements AtencionService {
	
	@Autowired
    private  AtencionRepository atencionRepository;
	
	@Autowired
    private  TicketRepository ticketRepository;



    @Override
    @Transactional
    public void iniciarAtencion(Long idAtencion) {
        Atencion atencion = atencionRepository.findById(idAtencion).orElse(null);
        if (atencion != null) {
            atencion.setEstado("En progreso");
            atencion.setFechaHoraInicio(new Timestamp(System.currentTimeMillis()));
            atencionRepository.save(atencion);

            Ticket ticket = atencion.getTicket();
            if (ticket != null) {
                ticket.setEstado("Atendiendo");
                ticketRepository.save(ticket);
            }
        }
    }

    @Override
    @Transactional
    public void finalizarAtencion(Long idAtencion) {
        Atencion atencion = atencionRepository.findById(idAtencion).orElse(null);
        if (atencion != null) {
            atencion.setEstado("Finalizado");
            atencion.setFechaHoraFin(new Timestamp(System.currentTimeMillis()));
            atencionRepository.save(atencion);

            Ticket ticket = atencion.getTicket();
            if (ticket != null) {
                ticket.setEstado("Cerrado");
                ticketRepository.save(ticket);
            }
        }
    }
    
    @Override
    @Transactional
    public void cancelarAtencion(Long idAtencion) {
        Atencion atencion = atencionRepository.findById(idAtencion).orElse(null);
        if (atencion != null) {
            atencion.setEstado("Cancelado");
            atencion.setFechaHoraFin(new Timestamp(System.currentTimeMillis()));
            atencionRepository.save(atencion);

            Ticket ticket = atencion.getTicket();
            if (ticket != null) {
                ticket.setEstado("Cancelado");
                ticketRepository.save(ticket);
            }
        }
    }


    @Override
    public Flux<List<Ticket>> obtenerTicketsPendientesYEnAtencionOrdenadosPorFecha() {
        return Flux.interval(Duration.ofSeconds(3)) // Emitir un valor cada 3 segundos
                .flatMap(tick -> Flux.fromIterable(ticketRepository.findByEstadoInOrderByFechaAsc(List.of("Pendiente", "Atendiendo"))))
                .collectList()
                .subscribeOn(Schedulers.boundedElastic())
                .repeat(); // Repetir el flujo continuamente
    }

}
