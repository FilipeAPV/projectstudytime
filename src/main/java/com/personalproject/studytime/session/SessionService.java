package com.personalproject.studytime.session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    Logger logger = LoggerFactory.getLogger(SessionService.class);

    @Autowired
    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public boolean saveSession(SessionModel sessionModel) {
        boolean isSaved = false;

        /**
         * REMOVE
         */
        sessionModel.setStartTime(LocalTime.of(0,0));
        sessionModel.setPauseTime(LocalTime.of(0,0));
        sessionModel.setResumeTime(LocalTime.of(0,0));
        sessionModel.setStopTime(LocalTime.of(0,0));
        /**
         *
         */

        int sessionNumber = 1 + sessionRepository.countAllByDate(sessionModel.getDate());
        sessionModel.setSessionNumber(sessionNumber);
        SessionModel savedSession = sessionRepository.save(sessionModel);

        if (savedSession.getId() != null && savedSession.getId() != 0) {
            logger.info("The following session has been saved: " + savedSession);
            isSaved = true;
        }
        return isSaved;
    }
}
