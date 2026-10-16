package pe.edu.cibertec.doctorservice.service;

import org.springframework.stereotype.Service;
import pe.edu.cibertec.doctorservice.entity.Doctor;
import pe.edu.cibertec.doctorservice.repository.DoctorRepository;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repository;
    
    public DoctorServiceImpl(DoctorRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Doctor> listAll() {
        return repository.findAll();
    }

    @Override
    public Doctor getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Doctor save(Doctor doctor) {
        return repository.save(doctor);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
