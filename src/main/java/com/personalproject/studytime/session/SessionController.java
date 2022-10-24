package com.personalproject.studytime.session;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SessionController {

    @GetMapping("/")
    public String showSessionForm(Model model) {
        model.addAttribute("sessionObj", new SessionModel());
        return "sessionForm";
    }

    @PostMapping("/saveSessionForm")
    public String saveSession(@ModelAttribute(name = "sessionObj") SessionModel sessionModel) {
        System.out.println(sessionModel);
        return "redirect:/";
    }

}
