package com.personalproject.studytime.session;

import com.personalproject.studytime.util.Export;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
public class SessionRestController {

    private final SessionRepository sessionRepository;
    private final SessionService sessionService;

    public SessionRestController(SessionRepository sessionRepository,
                                 SessionService sessionService) {
        this.sessionRepository = sessionRepository;
        this.sessionService = sessionService;
    }

    Logger logger = LoggerFactory.getLogger(SessionController.class);

    /**
     * Invalidates this session then unbinds any objects bound to it.
     * Throws:
     * IllegalStateException - if this method is called on an already invalidated session
     * @param httpSession
     * @return
     */
    @GetMapping("/deleteCurrentSessionAttribute")
    public boolean deleteCurrentSessionAttribute(HttpSession httpSession) {

        try {
            httpSession.invalidate();
        } catch (IllegalStateException e) {
            logger.info("Session Invalidation: FAILED");
            return false;
        }

        logger.info("Session Invalidation: SUCCEED");
        return true;
    }

    @GetMapping("/getSessionMarkdown/{id}")
    public String getSessionMarkdown(@PathVariable(name = "id") int id) throws Exception {

        Optional<SessionModel> session = sessionRepository.findById(id);

        if (session.isPresent()) {
            logger.info("Session ID " + session.get().getId() + " sent as markdown");
            return Export.objectToMarkdown(session.get(), true);
        } else {
            throw new Exception("Session not found");
        }
    }

    @GetMapping("/getSessionToEdit/{id}")
    public SessionModel getSessionToEdit(@PathVariable(name = "id") int id,
                                         Model model) throws Exception {
        Optional<SessionModel> sessionToEdit = sessionRepository.findById(id);

        if (sessionToEdit.isPresent()) {
            logger.info("Session ID " + sessionToEdit.get().getId() + " is being returned for Editing");

            return sessionToEdit.get();
        } else {
            throw new Exception("Session not found");
        }
    }

    @GetMapping("/export/{startDate}/{endDate}")
    public ResponseEntity downloadFile(@PathVariable(name = "startDate") String startDate,
                                                 @PathVariable(name = "endDate") String endDate) throws Exception {

        return sessionService.getFile(startDate, endDate);
    }

}
