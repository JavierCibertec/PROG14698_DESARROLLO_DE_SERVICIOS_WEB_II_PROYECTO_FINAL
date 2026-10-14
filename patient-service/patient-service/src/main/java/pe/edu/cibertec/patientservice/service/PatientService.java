package pe.edu.cibertec.patientservice.service;

import pe.edu.cibertec.patientservice.entity.Patient;
import java.util.List;

public interface PatientService {
    List<Patient> listAll();
    Patient getById(Long id);
    Patient save(Patient patient);
    void delete(Long id);
}
