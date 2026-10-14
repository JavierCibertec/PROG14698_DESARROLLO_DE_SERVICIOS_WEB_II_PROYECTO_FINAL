package pe.edu.cibertec.appointmentservice.service;

import pe.edu.cibertec.appointmentservice.entity.Appointment;
import java.util.List;

public interface AppointmentService {
    List<Appointment> listAll();
    Appointment getById(Long id);
    Appointment schedule(Appointment appointment);
    void cancel(Long id);
}
