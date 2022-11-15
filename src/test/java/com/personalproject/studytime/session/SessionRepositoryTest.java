package com.personalproject.studytime.session;

import com.personalproject.studytime.util.Constants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @Test
    void findByWord() {
        String existentKeyword = "project";
        String nonExistentKeyword = "ooo";
        String sortField = "date";
        String sortDir = "asc";
        int pageNum = 1;

        Sort sort = Sort.by(sortField);
        sort = (sortDir.equals("asc")) ? sort.ascending() : sort.descending();

        Pageable pageable = PageRequest.of(pageNum - 1, Constants.USERS_PER_PAGE, sort);

        Page<SessionModel> returnPageExistentKeyword = sessionRepository.findByWord(existentKeyword, pageable);
        Page<SessionModel> returnPageNonExistentKeyword = sessionRepository.findByWord(nonExistentKeyword, pageable);

        Assertions.assertTrue(returnPageExistentKeyword.getContent().size() > 0);
        assertEquals(0, returnPageNonExistentKeyword.getContent().size());


    }

    @Test
    void getSessionListFilteredByDate() {

        List<SessionModel> sessionModel;

        LocalDate start = LocalDate.of(2023,05,02);
        LocalDate end = LocalDate.of(2023,05,02);

        sessionModel = sessionRepository.getSessionListFilteredByDate(start, end);

        Assertions.assertEquals(0, sessionModel.size());

        sessionModel = new ArrayList<>();
        start = LocalDate.of(2022,9,05);
        end = LocalDate.of(2022,9,06);

        sessionModel = sessionRepository.getSessionListFilteredByDate(start, end);

        Assertions.assertEquals(6, sessionModel.size());

    }
}