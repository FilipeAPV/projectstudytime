package com.personalproject.studytime.session;

import com.personalproject.studytime.util.Constants;
import com.personalproject.studytime.util.Export;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
public class SessionRestController {

    private final SessionRepository sessionRepository;

    public SessionRestController(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    Logger logger = LoggerFactory.getLogger(SessionController.class);

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
            return Export.objectToMarkdown(session.get());
        } else {
            throw new Exception("Session not found");
        }
    }

}
