package com.personalproject.studytime.session;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/")
    public String showSessionForm(Model model) {
        model.addAttribute("sessionObj", new SessionModel());
        return "sessionForm";
    }

    @PostMapping("/saveSessionForm")
    public String saveSession(@ModelAttribute(name = "sessionObj") SessionModel sessionModel) {
        sessionService.saveSession(sessionModel);
        return "redirect:/";
    }

    @GetMapping("/sessionList")
    public String showSessionList(Model model) {
        List<SessionModel> sessionList = sessionService.getSessionList();
        model.addAttribute("sessionList", sessionList);
        System.out.println(sessionList.size());
        return "sessionList";
    }

}
