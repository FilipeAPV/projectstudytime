package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

public class Statistics {

    public static String formatSecondsToStr(long hours, long minutes, long seconds) {
        String h = "0",m = "0",s = "0";

        h = (hours <= 9) ? h += hours : String.valueOf(hours);
        m = (minutes <= 9) ? m += minutes : String.valueOf(minutes);
        s = (seconds <= 9) ? s += seconds : String.valueOf(seconds);

        return h+" H "+m+" m";
    }

    public static long localTimeToSeconds(LocalTime localTime) {
        long hours = (localTime.getHour() * 60) * 60;
        long minutes = localTime.getMinute() * 60;
        long seconds = localTime.getSecond();
        return hours + minutes + seconds;
    }

    public static String secondsToTimeFormat(long seconds) {
        long hours = (seconds / 60) / 60;
        long minutes = (seconds / 60) % 60;
        long sec = seconds % 60;
        return formatSecondsToStr(hours,minutes,sec);
    }

    public static long getTotalTimeOfStudyInSeconds(List<SessionModel> list) {
        return list.stream()
                .map( session -> session.getTotalStudyTime())
                .map( sessionTotalTime -> localTimeToSeconds(sessionTotalTime))
                .reduce(0L, (a,b) -> a+b);
    }

    public static String calcTotalTimeOfStudy(List<SessionModel> list) {
        long totalTimeOfStudyInSeconds = getTotalTimeOfStudyInSeconds(list);
        return secondsToTimeFormat(totalTimeOfStudyInSeconds);
    }

    public static String calcAverageTimePerStudySession(List<SessionModel> list) {
        long totalTimeOfStudyInSeconds = getTotalTimeOfStudyInSeconds(list);
        int numberOfStudySessions = list.size();

        int average = (int) (totalTimeOfStudyInSeconds / numberOfStudySessions);
        return secondsToTimeFormat(average);
    }

    public static String calcAverageTimePerStudyDay(List<SessionModel> list) {
        long totalTimeOfStudyInSeconds = getTotalTimeOfStudyInSeconds(list);
        List<LocalDate> listOfAllDates = list.stream().map(session -> session.getDate()).collect(Collectors.toList());
        long numberOfDifferentDates = listOfAllDates.stream().distinct().count();

        int average = (int) (totalTimeOfStudyInSeconds / numberOfDifferentDates);
        return secondsToTimeFormat(average);
    }

}
