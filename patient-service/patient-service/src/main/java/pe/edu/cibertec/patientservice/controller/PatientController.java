package pe.edu.cibertec.patientservice.controller;

import org.springframework.web.bind.annotation.*;
import pe.edu.cibertec.patientservice.entity.Patient;
import pe.edu.cibertec.patientservice.service.PatientService;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService service;
    
    public PatientController(PatientService service) {
        this.service = service;
    }

    @GetMapping
    public List<Patient> listAll() {
        return service.listAll();
    }

    @GetMapping("/{id}")
    public Patient getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Patient save(@RequestBody Patient patient) {
        return service.save(patient);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
