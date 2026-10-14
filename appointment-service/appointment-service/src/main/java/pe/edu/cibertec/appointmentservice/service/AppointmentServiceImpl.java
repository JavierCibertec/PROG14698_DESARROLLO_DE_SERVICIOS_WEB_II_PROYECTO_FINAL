package pe.edu.cibertec.appointmentservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.cibertec.appointmentservice.client.DoctorClient;
import pe.edu.cibertec.appointmentservice.dto.DoctorDTO;
import pe.edu.cibertec.appointmentservice.entity.Appointment;
import pe.edu.cibertec.appointmentservice.repository.AppointmentRepository;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private DoctorClient doctorClient;

    @Override
    public List<Appointment> listAll() { return repository.findAll(); }

    @Override
    public Appointment getById(Long id) { return repository.findById(id).orElse(null); }

    @Override
    public Appointment schedule(Appointment appointment) {
        DoctorDTO doctor = doctorClient.getDoctorById(appointment.getDoctorId());
        if (doctor == null || Boolean.FALSE.equals(doctor.getDisponible())) {
            throw new RuntimeException("El médico no está disponible para agendar cita");
        }
        appointment.setEstado("RESERVADA");
        return repository.save(appointment);
    }

    @Override
    public void cancel(Long id) {
        Appointment app = getById(id);
        if (app != null) {
            app.setEstado("CANCELADA");
            repository.save(app);
        }
    }
}
