package com.personalproject.studytime.session;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface SessionRepository extends JpaRepository<SessionModel, Integer> {

   @Query("SELECT count (s) FROM SessionModel s WHERE s.date = ?1")
   int countAllByDate(LocalDate date);

}
