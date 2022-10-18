# Day 1. (17/10/2022)

## Technical

- Established the basis for the project
      - Created repository and [free DB](https://www.freesqldatabase.com/) 
      - Wrote the following tests:
          - Check if the HTTP response status is **200** for a request to **/**
          - Perform CRUD operations against a test table on the DB
      - Created and uploaded a docker image to dockerhub
      - Deployed it with IBM Code Engine
      
## Analysis

- I've spent much more time than I thought necessary to write the CRUD tests
      - The **blocker** was related to my intention to create a Table using an sql script file to perform the tests on.
      - The issue was finally solved by establishing a test order.

## Hours of Work

- 6 H

# Day 2. (18/10/2022)

## Technical

- Created the Entity Class that will be used by JPA to create the Table
      - Populated this table with dummy data using an excellent [website](https://filldb.info/)

## Analysis
## Hours of Work