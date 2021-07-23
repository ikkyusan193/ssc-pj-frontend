package org.bryantinsurance;

import org.bryantinsurance.dto.*;
import org.bryantinsurance.model.Carrier;
import org.bryantinsurance.model.Client;
import org.bryantinsurance.model.User;
import org.springframework.beans.factory.annotation.Autowired;
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
    public CurrentUserDTO getCurrentUser() {
        try {
            Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal instanceof CustomUserDetails){
                CustomUserDetails user = (CustomUserDetails) principal;
                UserDTO u = userService.findByUsername(user.getUsername());
                return CurrentUserDTO.builder()
                        .isLoggedIn(true)
                        .username(u.getUsername())
                        .role(u.getRole())
                        .build();
            }
        } catch (Exception e) {

        }
        return CurrentUserDTO.builder()
                .isLoggedIn(false)
                .build();
    }


    @GetMapping("/user/{username}")
    public UserDTO getUser(@PathVariable("username") String username) {
        return userService.findByUsername(username);
    }

    @GetMapping("/user")
    public List<UserDTO> getAllUsers() {
        return userService.findAllUser();
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

    @PatchMapping("/user/changepw/{username}")
    public SimpleResponseDTO changePasswordUser(@RequestBody User request, @PathVariable("username") String username) {
        return userService.changePassword(username, request);
    }

    @GetMapping("/client")
    public List<ClientDTO> findAllClients() {
        return clientService.findAllClients();
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
    public List<CarrierDTO> getAllCarriers() {
        return clientService.getAllCarriers();
    }

    @GetMapping("/carrier/{cid}")
    public List<CarrierDTO> getCarriersOfClient(@PathVariable("cid") Long cid) {
        return clientService.findAllCarriersOfClient(cid);
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
