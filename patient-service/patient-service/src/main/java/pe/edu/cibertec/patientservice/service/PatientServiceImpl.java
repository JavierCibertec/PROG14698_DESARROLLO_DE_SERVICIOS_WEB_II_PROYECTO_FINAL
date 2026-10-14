package pe.edu.cibertec.patientservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.cibertec.patientservice.entity.Patient;
import pe.edu.cibertec.patientservice.repository.PatientRepository;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository repository;

    @Override
    public List<Patient> listAll() { return repository.findAll(); }

    @Override
    public Patient getById(Long id) { return repository.findById(id).orElse(null); }

    @Override
    public Patient save(Patient patient) { return repository.save(patient); }

    @Override
    public void delete(Long id) { repository.deleteById(id); }
}
