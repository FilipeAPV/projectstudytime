package com.personalproject.studytime.session;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SessionController {

    @GetMapping("/")
    public String showSessionForm() {
        return "sessionForm";
    }

}
