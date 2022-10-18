package com.personalproject.studytime.database;

import javax.persistence.*;

@Entity
@Table(name = "test_table")
public class ModelDatabaseTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String text;

    public ModelDatabaseTest(String text) {
        this.text = text;
    }

    public ModelDatabaseTest() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
