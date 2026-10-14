package pe.edu.cibertec.patientservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.cibertec.patientservice.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
