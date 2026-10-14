package pe.edu.cibertec.appointmentservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pe.edu.cibertec.appointmentservice.entity.Appointment;
import pe.edu.cibertec.appointmentservice.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    @GetMapping
    public List<Appointment> listAll() { return service.listAll(); }

    @GetMapping("/{id}")
    public Appointment getById(@PathVariable Long id) { return service.getById(id); }

    @PostMapping
    public Appointment schedule(@RequestBody Appointment appointment) { return service.schedule(appointment); }

    @PutMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id) { service.cancel(id); }
}