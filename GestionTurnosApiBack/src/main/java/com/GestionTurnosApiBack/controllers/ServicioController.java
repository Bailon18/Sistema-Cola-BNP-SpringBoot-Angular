package com.GestionTurnosApiBack.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.GestionTurnosApiBack.model.entity.Servicio;
import com.GestionTurnosApiBack.model.services.ServicioService;

import java.util.List;

@RestController
@RequestMapping("/servicios")
public class ServicioController {

    @Autowired
    private ServicioService servicioService;

    @GetMapping("/{id}")
    public ResponseEntity<Servicio> buscarPorId(@PathVariable Long id) {
        Servicio servicio = servicioService.buscarPorId(id);
        if (servicio != null) {
            return new ResponseEntity<>(servicio, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/guardar")
    public ResponseEntity<Servicio> guardar(@RequestBody Servicio servicio) {
        Servicio nuevoServicio = servicioService.guardar(servicio);
        return new ResponseEntity<>(nuevoServicio, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servicio> actualizar(@PathVariable Long id, @RequestBody Servicio servicio) {
        Servicio servicioActualizado = servicioService.actualizar(id, servicio);
        if (servicioActualizado != null) {
            return new ResponseEntity<>(servicioActualizado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Servicio>> listarTodos() {
        List<Servicio> servicios = servicioService.listarTodos();
        return new ResponseEntity<>(servicios, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deshabilitarServicio(@PathVariable Long id, @RequestParam boolean activo) {
        servicioService.deshabilitarServicio(id, activo);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
