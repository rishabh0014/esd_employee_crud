package net.employee_crud.springboot.controller;

import net.employee_crud.springboot.dto.Login;
import net.employee_crud.springboot.dto.LoginMessage;
import net.employee_crud.springboot.repository.AdminRepository;
import net.employee_crud.springboot.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void saveAdmin(Admin adminData) {
        String encodedPassword=this.passwordEncoder.encode(adminData.getPassword());
        adminData.setPassword((encodedPassword));
        adminRepository.save(adminData);
    }
    public LoginMessage loginEmployee(Login login) {
        String msg="";
        Admin adminFromRequest = adminRepository.findByEmail(login.getEmail());
        if(adminFromRequest!=null){
            String passwordFromRequest=login.getPassword();
            String passwordFromAdmin=adminFromRequest.getPassword();
            Boolean isPwdRight=passwordEncoder.matches(passwordFromRequest,passwordFromAdmin);
            if(isPwdRight){
                Optional<Admin> admin=adminRepository.findOneByEmailAndPassword(login.getEmail(),passwordFromAdmin);
                if(admin.isPresent()){
                    return new LoginMessage("Login Success",true);
                }
                else{
                    return new LoginMessage("Check Username and/or Password",false);
                }
            }
            else {
                return new LoginMessage("Check Username and/or Password", false);
            }
        }
        else{
            return new LoginMessage("Check Username and/or Password",false);
        }
    }
}