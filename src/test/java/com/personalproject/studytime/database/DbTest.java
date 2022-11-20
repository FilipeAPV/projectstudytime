package com.personalproject.studytime.database;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;

import java.util.Optional;

/**
 * Basic MySQL DB CRUD Operations Test
 *
 * @TestPropertySource, used to overwrite the necessary applications.properties fields.
 * Here we want to use SQL to create and drop our table for testing purposes, hence its use.
 */

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)
@TestPropertySource(properties = { "spring.jpa.hibernate.ddl-auto=none" })
@TestMethodOrder(MethodOrderer.OrderAnnotation.class) // Added because @Order was not being respected
class DbTest {

    @Autowired
    private RepositoryDbTest repositoryDbTest;

    @DisplayName("Create test table")
    @Sql(scripts = "/sql_scripts/create-table.sql")
    @Test
    @Order(1)
    void createTable() {
    }

    @DisplayName("Add Record to DB")
    @Test
    @Order(2)
    void databaseBasicOperationsTest() {
        EntityDbTest record1 = new EntityDbTest("Some Text 1");

        repositoryDbTest.save(record1);

        Optional<EntityDbTest> record1SavedOpt = repositoryDbTest.findById(1);

        if (record1SavedOpt.isPresent()) {
            Assertions.assertNotNull(record1SavedOpt.get());
        } else {
            Assertions.fail("record1SavedOpt is empty");
        }
    }

    @DisplayName("Update Record in DB")
    @Test
    @Order(3)
    void updateRecordInDbTest() {
        String textRetrievedFromUpdatedRecord = null;
        String textToUpdateRecord = "Some Text Updated";
        Optional<EntityDbTest> testDatabaseRecordOptional1 = repositoryDbTest.findById(1);

        if (testDatabaseRecordOptional1.isPresent()) {
            testDatabaseRecordOptional1.get().setText(textToUpdateRecord);
            repositoryDbTest.save(testDatabaseRecordOptional1.get());
        } else {
            Assertions.fail("Unable to find User with indicated ID");
        }

        Optional<EntityDbTest> testDatabaseRecordOptional2 = repositoryDbTest.findById(1);
        if (testDatabaseRecordOptional2.isPresent()) {
            textRetrievedFromUpdatedRecord = testDatabaseRecordOptional2.get().getText();
        } else {
            Assertions.fail("Unable to find User with indicated ID");
        }

        Assertions.assertEquals("Some Text Updated", textRetrievedFromUpdatedRecord);
    }
    @DisplayName("Delete Record in DB")
    @Test
    @Order(4)
    void deleteRecord() {
        int id = 1;
        int numberOfRecordsInDbAfterDeleting = 0;
        repositoryDbTest.deleteById(id);

        Assertions.assertEquals(numberOfRecordsInDbAfterDeleting, repositoryDbTest.count());
    }

/*    @DisplayName("Delete test table")
    @Sql(scripts = "/sql_scripts/drop-table.sql")
    @Test
    @Order(5)
    void deleteTable() {
    }*/
}
