package com.GestionTurnosApiBack.model.entity;


import jakarta.persistence.*;

import java.sql.Timestamp;

import org.springframework.data.annotation.CreatedDate;

import com.GestionTurnosApiBack.security.Entity.User;

@Entity
@Table(name = "atenciones")
public class Atencion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_ticket")
    private Ticket ticket;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private User usuario;

    @Column(columnDefinition = "VARCHAR(20) DEFAULT 'Pendiente'")
    private String estado; // Pendiente,  En progreso, Cancelado

    @CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
    private Timestamp  fechaHoraInicio;

    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp  fechaHoraFin;

    public Atencion() {
    }

    public Atencion(Ticket ticket, User usuario, String estado, Timestamp fechaHoraFin) {

        this.ticket = ticket;
        this.usuario = usuario;
        this.estado = estado;
        this.fechaHoraFin = fechaHoraFin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public User getUsuario() {
        return usuario;
    }

    public void setUsuario(User usuario) {
        this.usuario = usuario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Timestamp getFechaHoraInicio() {
        return fechaHoraInicio;
    }

    public void setFechaHoraInicio(Timestamp fechaHoraInicio) {
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public Timestamp getFechaHoraFin() {
        return fechaHoraFin;
    }

    public void setFechaHoraFin(Timestamp fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }


    

}
