FROM eclipse-temurin:17-jdk-focal
WORKDIR /app

COPY mvnw ./
COPY pom.xml ./
COPY .mvn/ .mvn

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY src ./src

# Run tests on docker image creation
RUN ./mvnw test

CMD ["./mvnw", "spring-boot:run"]