package pe.edu.cibertec.appointmentservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.cibertec.appointmentservice.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
