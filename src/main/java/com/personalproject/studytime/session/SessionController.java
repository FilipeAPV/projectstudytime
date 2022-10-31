package com.personalproject.studytime.session;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    public String redirectToPageableSessionList() {
        return "redirect:/sessionList/1?sortField=date&sortDir=dsc";
    }

    @GetMapping("/sessionList/{pageNum}")
    public String showSessionList(Model model,
                                  @PathVariable(name = "pageNum") int pageNum,
                                  @RequestParam(name = "sortField") String sortField,
                                  @RequestParam(name = "sortDir") String sortDir) {

        String reverseSortDir = (sortDir.equals("asc")) ? "dsc" : "asc";

        Page<SessionModel> page = sessionService.getSessionList(pageNum, sortField, sortDir);
        List<SessionModel> sessionList = page.getContent();

        model.addAttribute("sessionList", sessionList);
        model.addAttribute("totalPages", page.getTotalPages());
        model.addAttribute("currentPage", pageNum);
        model.addAttribute("sortField", sortField);
        model.addAttribute("sortDir", sortDir);
        model.addAttribute("reverseSortDir", reverseSortDir);

        return "sessionList";
    }

}
