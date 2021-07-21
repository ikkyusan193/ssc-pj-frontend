package org.bryantinsurance;

import org.bryantinsurance.model.Carrier;
import org.bryantinsurance.model.Client;
import org.bryantinsurance.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ClientService clientService;

    @GetMapping("/current_user")
    public CurrentUserDTO getCurrentUser(){

        try {
            Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal instanceof CustomUserDetails){
                System.out.println("hi");
                CustomUserDetails user = (CustomUserDetails) principal;
                User u = userService.findByUsername(user.getUsername());
                return CurrentUserDTO.builder()
                        .isLoggedIn(true)
                        .username(u.getUsername())
                        .role(u.getRole())
                        .build();
            }
        }catch (Exception e){

        }
        return CurrentUserDTO.builder()
                .isLoggedIn(false)
                .build();
    }


    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        return ResponseEntity.ok(userService.findByUsername(username));
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUser());
    }

    @PostMapping("/user/create")
    public SimpleResponseDTO createUser(@RequestBody User request) {
        return userService.createUser(request);
    }

    @PatchMapping("/user/{username}")
    public SimpleResponseDTO updateUser(@RequestBody User request, @PathVariable("username") String username) {
        return userService.updateUser(username, request);
    }

    @DeleteMapping("/user/{username}")
    public SimpleResponseDTO deleteUser(@PathVariable("username") String username) {
        return userService.deleteUser(username);
    }

    @GetMapping("/client")
    public ResponseEntity<List<Client>> findAllClients() {
        return ResponseEntity.ok(clientService.findAllClients());
    }

    @PostMapping("/client/create")
    public SimpleResponseDTO createClient(@RequestBody Client request) {
        return clientService.createClient(request);
    }

    @PatchMapping("/client/{cid}")
    public SimpleResponseDTO updateClient(@RequestBody Client request, @PathVariable("cid") Long cid) {
        return clientService.updateClient(cid, request);
    }

    @DeleteMapping("/client/{cid}")
    public SimpleResponseDTO deleteClient(@PathVariable("cid") Long cid) {
        return clientService.deleteClient(cid);
    }

    @GetMapping("/carrier")
    public List<Carrier> getAllCarriers() {
        return clientService.getAllCarriers();
    }

    @GetMapping("/carrier/{cid}")
    public List<Carrier> getCarriersofClient(@PathVariable("cid") Long cid) {
        return clientService.findAllCarriers(cid);
    }

    @PostMapping("/carrier/create/{cid}")
    public SimpleResponseDTO addCarrierToClient(@RequestBody Carrier request, @PathVariable("cid") Long cid) {
        return clientService.addCarrierToClient(cid, request);
    }

    @DeleteMapping("/carrier/delete/{cid}/{id}")
    public SimpleResponseDTO deleteCarrierFromClient(@PathVariable("cid") Long cid, @PathVariable("id") Long id) {
        return clientService.deleteCarrierFromClient(cid, id);
    }

    @PostMapping("/carrier/create")
    public SimpleResponseDTO createCarrier(@RequestBody Carrier request) {
        return clientService.createCarrier(request);
    }

    @DeleteMapping("/carrier/delete/{id}")
    public SimpleResponseDTO deleteCarrier(@PathVariable("id") Long id) {
        return clientService.deleteCarrier(id);
    }
}
