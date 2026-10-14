package pe.edu.cibertec.doctorservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.cibertec.doctorservice.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
