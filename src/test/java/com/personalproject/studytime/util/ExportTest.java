package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;
import com.personalproject.studytime.session.SessionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ExportTest {

    @Autowired
    private SessionRepository sessionRepository;

    @Test
    void objectToMarkdown() {
        Optional<SessionModel> session = sessionRepository.findById(1);
        String markdown = "";

        if (session.isPresent()) {
            markdown = Export.objectToMarkdown(session.get());
        }

        System.out.println(markdown);

    }
}