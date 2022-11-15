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
- Moved the previously worked on layout to the project
      - **Blocker**: An application re-start was necessary to update the static content *(css, img, js)* on the page displaid.
          - Managed to find a way to solve the issue, but it took me a considerable amount of time to do so.

## Analysis

- So far I've been blocked by general issues that nothing have to do with the problem I'm trying to solve.
      - Also, I've been taking note of the solutions for these problems for future reference.

## Hours of Work

- 4 H

# Day 3. (24/10/2022)

## As a Scrum Master

- **Sprint Status**
      - ![Burndown Chart](https://bitbucket.org/FAPVieira/projectstudytime/raw/fa0ed3a0a8d38e61b48d5bec0da768c37ce0e06e/documentation/resources/burndown_chart_241022.png)

      - **Situation:**
          - We are clearly behind schedule for the reasons stated earlier. 
      - **Measures:**
          - As we need to deliver some piece of functionality by the end of the sprint we will **prioritize** tickets that are related to front-end so we are able to make a show and tell and receive some feedback.  
      - **Constraints:**
          - As mentioned, the risk *technical complexity* was materialized and now we are facing **time constraints**. 
              - Either we'll need to work more time - increasing the cost, or deliver less functionality - lowering the quality.       

## Technical

- Worked on the START, PAUSE, RESUME and STOP button's
- Study session timer
- Re-created the Entity class because I didn't save or push it to the server
- Worked on the session form submission

## Analysis

- Without major blockers the coding session went very well

## Hours of Work

- 5 H

# Day 4. (25/10/2022)

## Technical

- Implement indentation strategy previously developed
- Add field validation (client side)
- Add modal messages
- Add markdown preview

## Analysis

- Solved some interesting problems and didn't have major blockers

## Hours of Work

- 7 H

# END OF THE FIRST SPRINT

## Technical
- ![UI_1](https://bitbucket.org/FAPVieira/projectstudytime/raw/c49bf45833d23d83bd7b078cb301df2a53c0cb2c/documentation/resources/point1_a.png)
- ![UI_2](https://bitbucket.org/FAPVieira/projectstudytime/raw/c49bf45833d23d83bd7b078cb301df2a53c0cb2c/documentation/resources/point1_b.png)

## Spring Snapshot
- ![KanbanBoard](https://bitbucket.org/FAPVieira/projectstudytime/raw/0bfa56eaff4029d7a00aba1316ffe916ed024af7/documentation/resources/agile_25102022.png)

## Total Hours of Work

- 22 H

## Contract
- In contractual terms we've failed the delivery of the **save** module corresponding to the first milestone.

## As a Product Owner 

- Client comments:
      - Requested a UI change: modals need to be vertically lowered 
      - Detected a bug: pictures are expanding of the parent div.

- General orientation for the next sprint:
      - Address the database part that we should have delivered and prioritize other database related tickets (listing daily logs, etc)

- Sprint Planning:
      - ![SprintPlanning](https://bytebucket.org/FAPVieira/projectstudytime/raw/589018e2a09de4987e6e5ae90ab9ef02064c0420/documentation/resources/start_second_sprint_311022.png?token=8c69e2d660584d7ba04bdbc8135117ab1286ec6c)

# Day 5. (31/10/2022)

## Technical

- Persist sessions in the DB
- JS and HTML code refactoring
- Pagination and Sorting

      - ![SessionListLayout](https://bytebucket.org/FAPVieira/projectstudytime/raw/2d1dc965daa72f3c48f93a15717a151d790977dc/documentation/resources/list_session_31102022.png?token=0368431a453781aff12be05a161c732f540f80a2)

## Analysis

- Without major blockers, the session went well.

## Hours of Work

- 6H

# Day 6. (01/11/2022)

## Technical

- Most of the day was dedicated to allow the user to list saved sessions without loosing the current session's **data** (time, content and/or feelings already written)
      - When the user changes page, the current **data** is saved in an HttpSession object
          - An hidden field containing the current session stated (Ex: started, paused, etc) is also saved.
      - When the user get's back to the main page:
          - The form is loaded with the Object from the HttpSession
          - The buttons configuration (disabled, etc) is loaded based on the hidden field

- Connected the app with the Database that has *real data* and that helped detecting some bugs

## Analysis

- I had several blockers during the day but managed to accomplish the above described task.
      - To achieve that I worked 3 hours more than what I should have done which will likely bring some kind of constrain in the future (quality or cost)

- Also, I'm detecting new bugs that need to be addressed and that will cause time constraints later on.

## Hours of Work

- 7H

# Day 7. (07/11/2022)

## As a Scrum Master

- **Sprint Status**

      - ![Burndown Chart](https://bitbucket.org/FAPVieira/projectstudytime/raw/813384ef21ce17b37c6852a150da1f9729cccc5a/documentation/resources/burndown_chart_051122.png)

      - **Situation:**
          - Still behind schedule. 
          - Story points were attributed to the new tickets in the backlog. A total of **extra 8.5 hours** of work were added.
      - **Measures:**
          - We'll focus on the items **contractualized** for delivery by the end of the second sprint.
          - Also, we'll avoid spending time on code refactoring or non-visible changes. 
      - **Constraints:**
          - As on the previous sprint, the risk *technical complexity* was materialized once again and we continue facing **time constraints**. 
              - Either we'll need to work more time - increasing the cost, or deliver less functionality - lowering the quality.   

## Technical

- Search bar functionality
      - ![Search Bar](https://bitbucket.org/FAPVieira/projectstudytime/raw/59581f79ef43b9969a21725d2907b5ffb9765875/documentation/resources/searchbar_07112022.png)

## Analysis

- Add some issues to apply the yellow highlighting
- Started working on the feature "markdown visualization" of saved sessions
      - Hopefully will be done by tomorrow

## Hours of Work

- 8H30M

# Day 8. (08/11/2022)

## Technical

- Editing existing sessions (preliminary version)
      - ![Edit Session](https://bitbucket.org/FAPVieira/projectstudytime/raw/a73518dcc54aeb475774ddc076d1d6e3b2ebacd2/documentation/resources/edit_session_08112022.png)

## Analysis

- Extra complexity added by using @RestControllers (fetching data from the front-end)
      - It's the first time I've used it.

- Reverse the indentation also took more time than predicted.
- Overall, the component is done, now it'll need a couple of improvements.

## Hours of Work

- 7H40M

# END OF THE SECOND SPRINT

### Total Sprint Time: 29 H
### Total Project Time: 51 H
### Initially Contractualized Time: 46 H  
##
## Situation
- Failed to deliver the **Export study sessions as markdown** functionality 
- The most challenging feature of **Edit selected study session** is done but requires some refactoring
###
- The developers lack of experience and knowledge contributed for the situation where we are now: **hugely constrained by time.**

## As a Product Owner
- **Constrained by Time**, none of the functional requirements projected for this sprint will be delivered.
- Focus will be on delivering the **export** functionality, bug correction and UI improvement.
###
- ![Backlog](https://bitbucket.org/FAPVieira/projectstudytime/raw/21976a24672751fac1834f945897932a507fd21e/documentation/resources/backlog_14112022.png)

# Day 9. (14/11/2022)

## Technical
- Indentation algorithm bug fix
- Refactored / redesigned the sessionList.html
      - Stopped using tables and started using cards
- Set the ground to implement the calendar component

# Analysis
- Good day of work without any major blockers.

# Day 10. (15/11/2022)

## Technical
- Temporary file with n number of sessions formatted as markdown
- Download file from browser

# Analysis
- Spent much more time than expected working on the export functionality.
      - No special blocker, just trial and error on some features which takes time.