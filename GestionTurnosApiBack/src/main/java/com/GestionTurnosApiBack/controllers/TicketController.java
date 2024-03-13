package com.GestionTurnosApiBack.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.GestionTurnosApiBack.model.entity.Ticket;
import com.GestionTurnosApiBack.model.services.TicketService;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/generar")
    public ResponseEntity<Ticket> generarTicket(@RequestBody Ticket ticket) {
        Ticket nuevoTicket = ticketService.generarTicket(ticket);
        return new ResponseEntity<>(nuevoTicket, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> buscarPorId(@PathVariable Long id) {
        Ticket ticket = ticketService.buscarPorId(id);
        if (ticket != null) {
            return new ResponseEntity<>(ticket, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/cambiar-estado")
    public ResponseEntity<Void> cambiarEstadoTicket(@PathVariable Long id, @RequestParam String nuevoEstado) {
        ticketService.cambiarEstadoTicket(id, nuevoEstado);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
