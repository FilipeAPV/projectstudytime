package com.personalproject.studytime.session;

import com.personalproject.studytime.util.Constants;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class SessionController {

    private final SessionService sessionService;
    Logger logger = LoggerFactory.getLogger(SessionController.class);

    @Autowired
    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/")
    public String showSessionForm(Model model,
                                  HttpSession httpSession) {

        if (httpSession.getAttribute(Constants.OBJECT_SAVED_IN_SESSION) != null) {
            SessionModel sessionModel = (SessionModel) httpSession.getAttribute(Constants.OBJECT_SAVED_IN_SESSION);
            model.addAttribute("sessionObj", sessionModel);
            logger.info("sessionModel from the Session: " + sessionModel);
        } else {
            model.addAttribute("sessionObj", new SessionModel());
            httpSession.setAttribute("isSessionOngoing", null);
            httpSession.setAttribute("sessionState", null);
            logger.info("sessionModel from the Session is NULL. Sending new Object");
        }

        return "sessionForm";
    }

    @PostMapping("/saveSessionForm")
    public String saveSession(@ModelAttribute(name = "sessionObj") SessionModel sessionModel) {
        sessionService.saveSession(sessionModel);
        return "redirect:/";
    }

    @PostMapping("/sessionList")
    public String redirectToPageableSessionList(@ModelAttribute(name = "sessionObj") SessionModel sessionModel,
                                                @RequestParam(name = "currentSessionStateHidden") String sessionState,
                                                HttpSession httpSession) {

        httpSession.setAttribute(Constants.OBJECT_SAVED_IN_SESSION, sessionModel);
        httpSession.setAttribute("sessionState", sessionState);

        logger.info("The following session information has been saved in the Session: " + sessionModel);
        logger.info("sessionState: " + sessionState + "\n");

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
