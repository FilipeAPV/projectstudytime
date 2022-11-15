package com.personalproject.studytime.session;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<SessionModel, Integer> {

   @Query("SELECT count (s) FROM SessionModel s WHERE s.date = ?1")
   int countAllByDate(LocalDate date);

   @Query("SELECT s FROM SessionModel s WHERE CONCAT(s.date, ' ', s.content, ' ', s.feelings) LIKE %?1%")
   Page<SessionModel> findByWord(String keyword, Pageable pageable);

   @Query("SELECT s FROM SessionModel s WHERE s.date >= ?1 and s.date <= ?2")
   List<SessionModel> getSessionListFilteredByDate(LocalDate dateOfStart, LocalDate dateOfEnd);

   @Query("SELECT s FROM SessionModel s WHERE s.date >= ?1 and s.date <= ?2")
   Page<SessionModel> getSessionListFilteredByDate(LocalDate dateOfStart, LocalDate dateOfEnd, Pageable pageable);
}
