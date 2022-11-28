# README

- Access the application on-line [here](https://f-projectstudytime.tpy1e7yxhct.eu-gb.codeengine.appdomain.cloud/).
- [Watch introductory video](https://www.youtube.com/watch?v=odY2V7wbBUA)

# LINKS

- [Problem that I'm trying to solve and PoC](https://bitbucket.org/FAPVieira/studytime/src/master/Research/CaseStudy.md)
- [Project Diary](https://bitbucket.org/FAPVieira/projectstudytime/src/master/documentation/diary.md)

# How do I get set up?

1. Download and Install Docker
2. Clone or Fork Repository
3. From the project directory ```...\projectstudytime>``` run the following commands:
      1. ```docker build -t studytime .```
      2. ```docker run -p 8085:5000 -t studytime```
4. From your browser access ```http://localhost:8085/``` 
