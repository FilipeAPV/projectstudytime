package com.personalproject.studytime.session;

import com.personalproject.studytime.util.TempFile;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SessionServiceTest {

    @Autowired
    private SessionService sessionService;

    @Test
    void getSessionListFiltered() {
        //sessionService.getSessionListFiltered("2022-09-05","2022-09-06");
        TempFile.getLocalDateTime();
    }

    @Test
    void getTimeOfStudyTest() {
        LocalTime start = LocalTime.of(07,30,00);
        LocalTime end = LocalTime.of(10,00,00);

        Long startTimeToNano = start.toNanoOfDay();
        LocalTime diffStartSessionEndSession = end.minusNanos(startTimeToNano);
        Assertions.assertEquals(LocalTime.of(02,30), diffStartSessionEndSession);
    }

}