package com.GestionTurnosApiBack.model.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.GestionTurnosApiBack.model.entity.Modulo;
import com.GestionTurnosApiBack.model.repository.ModuloRepository;
import com.GestionTurnosApiBack.model.services.ModuloService;

@Service
public class ModuloServiceImpl implements ModuloService {

    @Autowired
    private ModuloRepository moduloRepository;

    @Override
    @Transactional(readOnly = true)
    public Modulo buscarPorId(Long id) {
        Optional<Modulo> optionalModulo = moduloRepository.findById(id);
        return optionalModulo.orElse(null);
    }

    @Override
    @Transactional
    public Modulo guardar(Modulo modulo) {
        return moduloRepository.save(modulo);
    }

    @Override
    @Transactional
    public Modulo actualizar(Long id, Modulo modulo) {
        if (moduloRepository.existsById(id)) {
            modulo.setId(id);
            return moduloRepository.save(modulo);
        }
        return null;
    }

    @Override
    @Transactional
    public void cambiarEstadoModulo(Long id, boolean activo) {
        Optional<Modulo> optionalModulo = moduloRepository.findById(id);
        optionalModulo.ifPresent(modulo -> {
            modulo.setActivo(activo);
            moduloRepository.save(modulo);
        });
    }

    @Override
    public List<Modulo> listarTodos() {
        return moduloRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
}
