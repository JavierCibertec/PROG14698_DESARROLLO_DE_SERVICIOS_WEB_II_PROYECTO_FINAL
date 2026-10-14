package pe.edu.cibertec.doctorservice.service;

import pe.edu.cibertec.doctorservice.entity.Doctor;
import java.util.List;

public interface DoctorService {
    List<Doctor> listAll();
    Doctor getById(Long id);
    Doctor save(Doctor doctor);
    void delete(Long id);
}
