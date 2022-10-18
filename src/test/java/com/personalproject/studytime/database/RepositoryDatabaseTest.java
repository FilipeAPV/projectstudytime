package com.personalproject.studytime.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryDatabaseTest extends JpaRepository<ModelDatabaseTest, Integer> {
}
