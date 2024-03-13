package com.GestionTurnosApiBack.model.services.impl;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.GestionTurnosApiBack.model.entity.Servicio;
import com.GestionTurnosApiBack.model.repository.ServicioRepository;
import com.GestionTurnosApiBack.model.services.ServicioService;


@Service
public class ServicioServiceImpl implements ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    @Override
    @Transactional(readOnly = true)
    public Servicio buscarPorId(Long id) {
        Optional<Servicio> optionalServicio = servicioRepository.findById(id);
        return optionalServicio.orElse(null);
    }

    @Override
    @Transactional
    public Servicio guardar(Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    @Override
    @Transactional
    public Servicio actualizar(Long id, Servicio servicio) {
        if (servicioRepository.existsById(id)) {
            servicio.setId(id);
            return servicioRepository.save(servicio);
        }
        return null;
    }


    @Override
    public List<Servicio> listarTodos() {
        return servicioRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    @Transactional
    public void deshabilitarServicio(Long id, boolean activo) {
        Optional<Servicio> optionalServicio = servicioRepository.findById(id);
        optionalServicio.ifPresent(servicio -> {
            servicio.setActivo(activo);
            servicioRepository.save(servicio);
        });
    }
}
