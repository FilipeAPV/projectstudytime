package com.personalproject.studytime.session;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "session")
public class SessionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "session_number")
    private Integer sessionNumber;

    @Column(nullable = false, name="session_date")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate date;

    @Column(nullable = false, name = "start_time")
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalTime startTime;

    @Column(nullable = false, name = "paused_time")
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalTime totalPausedTime = LocalTime.of(0,0,0);

    @Column(nullable = false, name = "total_time")
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalTime totalStudyTime;

    @Column(nullable = false, name = "stop_time")
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalTime stopTime;

    @Column(length = 5000, nullable = false, name="session_content")
    private String content;

    @Column(length = 5000, nullable = true, name="session_feelings")
    private String feelings;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSessionNumber() {
        return sessionNumber;
    }

    public void setSessionNumber(Integer sessionNumber) {
        this.sessionNumber = sessionNumber;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getTotalPausedTime() {
        return totalPausedTime;
    }

    public void setTotalPausedTime(LocalTime pauseTime) {
        this.totalPausedTime = pauseTime;
    }

    public LocalTime getTotalStudyTime() {
        return totalStudyTime;
    }

    public void setTotalStudyTime(LocalTime resumeTime) {
        this.totalStudyTime = resumeTime;
    }

    public LocalTime getStopTime() {
        return stopTime;
    }

    public void setStopTime(LocalTime stopTime) {
        this.stopTime = stopTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFeelings() {
        return feelings;
    }

    public void setFeelings(String feelings) {
        this.feelings = feelings;
    }

    @Override
    public String toString() {
        return "SessionModel{" +
                "id=" + id +
                ", sessionNumber=" + sessionNumber +
                ", date=" + date +
                ", startTime=" + startTime +
                ", stopTime=" + stopTime +
                '}';
    }
}
