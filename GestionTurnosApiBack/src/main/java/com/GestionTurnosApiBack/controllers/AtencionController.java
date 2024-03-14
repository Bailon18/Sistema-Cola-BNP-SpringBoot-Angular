package com.GestionTurnosApiBack.controllers;

import com.GestionTurnosApiBack.model.entity.Ticket;
import com.GestionTurnosApiBack.model.services.AtencionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/atenciones")
public class AtencionController {

    @Autowired
    private AtencionService atencionService;

    @PutMapping("/{id}/iniciar")
    public ResponseEntity<Void> iniciarAtencion(@PathVariable Long id) {
        atencionService.iniciarAtencion(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}/finalizar")
    public ResponseEntity<Void> finalizarAtencion(@PathVariable Long id) {
        atencionService.finalizarAtencion(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelarAtencion(@PathVariable Long id) {
        atencionService.cancelarAtencion(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/tickets-pendientes-y-en-atencion")
    public ResponseEntity<List<Ticket>> ticketsPendientesYEnAtencionOrdenadosPorFecha() {
        List<Ticket> tickets = atencionService.obtenerTicketsPendientesYEnAtencionOrdenadosPorFecha();
        return ResponseEntity.ok().body(tickets);
    }

}
