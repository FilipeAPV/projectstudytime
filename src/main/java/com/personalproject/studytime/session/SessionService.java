package com.personalproject.studytime.session;

import com.personalproject.studytime.util.Constants;
import com.personalproject.studytime.util.TempFile;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
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

        sessionModel.setTotalStudyTime(getTotalStudyTime(sessionModel));
        SessionModel savedSession = sessionRepository.save(sessionModel);

        if (savedSession.getId() != null && savedSession.getId() != 0) {
            logger.info("The following session has been saved: " + savedSession.getId());
            isSaved = true;
        }

        return isSaved;
    }

    public Page<SessionModel> getSessionList(int pageNum, String startDate, String endDate, String sortField, String sortDir, String keyword) {

        StringBuilder info = new StringBuilder();
        /*info.append("Information received: ").append(pageNum).append(" ").append(startDate).append(" ").append(endDate);*/

        logger.info(info.toString());

        Sort sort = Sort.by(sortField);
        sort = (sortDir.equals("asc")) ? sort.ascending() : sort.descending();

        Pageable pageable = PageRequest.of(pageNum - 1, Constants.USERS_PER_PAGE, sort);

        if (!StringUtils.isAllBlank(startDate) && !StringUtils.isAllBlank(endDate)) {
            LocalDate dateOfStart = LocalDate.parse(startDate);
            LocalDate dateOfEnd = LocalDate.parse(endDate);
            logger.info("Results filtered by date");
            return sessionRepository.getSessionListFilteredByDate(dateOfStart, dateOfEnd, pageable);
        }

        if (!StringUtils.isAllBlank(keyword)) {
            logger.info("Results filtered by keyword: " + keyword);
            return sessionRepository.findByWord(keyword, pageable);
        }

        return sessionRepository.findAll(pageable);
    }

    public ResponseEntity getFile(String startDate, String endDate) {
        LocalDate dateOfStart = LocalDate.parse(startDate);
        LocalDate dateOfEnd = LocalDate.parse(endDate);

        List<SessionModel> sessionList = sessionRepository.getSessionListFilteredByDate(dateOfStart,dateOfEnd);

        File tempFile = TempFile.createFile(sessionList);

        try {
            return TempFile.downloadFile(tempFile);
        } catch (IOException e) {
            logger.error(e.getMessage());
        }

        return null;
    }
    private LocalTime getTotalStudyTime(SessionModel sessionModel) {
        Long startTimeToNano = sessionModel.getStartTime().toNanoOfDay();
        Long pauseTimeToNano = sessionModel.getTotalPausedTime().toNanoOfDay();

        LocalTime diffEndStart = sessionModel.getStopTime().minusNanos(startTimeToNano);
        LocalTime totalStudyTime = diffEndStart.minusNanos(pauseTimeToNano);

        return totalStudyTime;
    }
}
