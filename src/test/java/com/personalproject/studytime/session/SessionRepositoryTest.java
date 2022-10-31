package com.personalproject.studytime.session;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SessionRepositoryTest {

    @Autowired
    private SessionRepository sessionRepository;

    @Test
    void countAllByDate() {
        LocalDate testDate = LocalDate.of(1970, 9,11);
        int count = sessionRepository.countAllByDate(testDate);
        System.out.println(count);
    }
}