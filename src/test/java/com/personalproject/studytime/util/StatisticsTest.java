package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;
import com.personalproject.studytime.session.SessionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class StatisticsTest {

    @Autowired
    private SessionRepository sessionRepository;

    @Test
    void calcTotalTimeOfStudy() {
        SessionModel s1 = sessionRepository.findById(1).get();
        SessionModel s2 = sessionRepository.findById(2).get();
        SessionModel s3 = sessionRepository.findById(3).get();

        LocalTime localTime = LocalTime.of(00,00,1);



        List<SessionModel> list = List.of(s1,s2,s3);
/*        System.out.println(Statistics.secondsToTimeFormat(500));*/

        Assertions.assertEquals("08 H 15 m", Statistics.calcTotalTimeOfStudy(list));
        Assertions.assertEquals("02 H 45 m", Statistics.calcAverageTimePerStudySession(list));
    }

    @Test
    void calcTotalTimeOfStudyVerification() {
        long hours = 0L;
        long minutes = 0L;
        long seconds = 0L;

        List<SessionModel> list = sessionRepository.findAll();
        List<LocalTime> time = list.stream().map(SessionModel::getTotalStudyTime).collect(Collectors.toList());

        for (LocalTime t : time) {
            hours += t.getHour();
            minutes += t.getMinute();
            seconds += t.getSecond();
        }

        int timeSeconds = (int) seconds % 60;
        int timeMinutes = (int) (seconds / 60 + minutes) % 60;
        int timeHour = (int) (((seconds / 60 + minutes) / 60) + hours);

        System.out.println("hours:" + hours + " minutes: " + minutes + " seconds: " + seconds);

        System.out.println("minutes in hours is: " + minutes / 60 + " remaining: " + minutes % 60);
        System.out.println("seconds in minutes is: " + seconds / 60 + " remaining: " + seconds % 60);

        System.out.println("\nhours: " + timeHour);
        System.out.println("minutes: " + timeMinutes);
        System.out.println("seconds: " + timeSeconds);

    }
}