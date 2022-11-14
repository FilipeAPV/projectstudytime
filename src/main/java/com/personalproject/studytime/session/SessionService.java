package com.personalproject.studytime.session;

import com.personalproject.studytime.util.Constants;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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

        if (sessionModel.getSessionNumber() == null) {
            int sessionNumber = 1 + sessionRepository.countAllByDate(sessionModel.getDate());
            sessionModel.setSessionNumber(sessionNumber);
        }

        SessionModel savedSession = sessionRepository.save(sessionModel);

        if (savedSession.getId() != null && savedSession.getId() != 0) {
            logger.info("The following session has been saved: " + savedSession.getId());
            isSaved = true;
        }

        return isSaved;
    }

    public Page<SessionModel> getSessionList(int pageNum, String sortField, String sortDir, String keyword) {
        Sort sort = Sort.by(sortField);
        sort = (sortDir.equals("asc")) ? sort.ascending() : sort.descending();

        Pageable pageable = PageRequest.of(pageNum - 1, Constants.USERS_PER_PAGE, sort);

        if (!StringUtils.isAllBlank(keyword)) {
            return sessionRepository.findByWord(keyword, pageable);
        }

        return sessionRepository.findAll(pageable);
    }
}
