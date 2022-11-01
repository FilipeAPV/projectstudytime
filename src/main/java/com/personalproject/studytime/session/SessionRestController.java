package com.personalproject.studytime.session;

import com.personalproject.studytime.util.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class SessionRestController {

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

}
