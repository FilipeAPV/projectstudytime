package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalTime;

public class Export {
    /**
     * 6 spaces are needed when the String is sent to be displayed to the user as markdown.
     * 0 spaces are needed when the String is used to create a file for download.
     * @param sessionModel
     * @param isDisplayedToTheUser
     * @return
     */
    public static String objectToMarkdown(SessionModel sessionModel, boolean isDisplayedToTheUser) {
        LocalTime invalidTime = LocalTime.of(0, 0, 0);

        String emptySpaces = "";
        String markdownHeader = "- ";

        if (isDisplayedToTheUser) {
            emptySpaces = "      ";
            markdownHeader = "### ";
        }

        StringBuilder markdown = new StringBuilder();

        if (sessionModel.getSessionNumber() == 1) {
            markdown.append(emptySpaces).append("## ").append(sessionModel.getDate()).append("\n");
        }
        markdown.append(emptySpaces).append("### **Session** ").append(sessionModel.getSessionNumber()).append("\n")
                .append(emptySpaces).append("- Start: ").append(sessionModel.getStartTime()).append("\n");

        if (sessionModel.getPauseTime() != null && sessionModel.getPauseTime() != invalidTime) {
            markdown.append(emptySpaces).append("- Pause: ").append(sessionModel.getPauseTime()).append("\n");
            markdown.append(emptySpaces).append("- Resume: ").append(sessionModel.getResumeTime()).append("\n");
        }

        markdown.append(emptySpaces).append("- End: ").append(sessionModel.getStopTime()).append("\n\n")
                .append(emptySpaces).append(markdownHeader).append("**Content:** \n").append(sessionModel.getContent()).append("\n\n");

        if (StringUtils.isNotBlank(sessionModel.getFeelings())) {
            markdown.append(emptySpaces).append(markdownHeader).append("**Feelings:** \n").append(sessionModel.getFeelings()).append("\n");
        }

        return markdown.toString();
    }

    public static String exportSessionAsMarkdown(SessionModel sessionModel) {
        LocalTime invalidTime = LocalTime.of(0, 0, 0);

        String emptySpaces = "      ";
        String markdownHeader = "- ";
        String dayOfTheWeek = String.valueOf(sessionModel.getDate().getDayOfWeek());

        StringBuilder markdown = new StringBuilder();

        if (sessionModel.getSessionNumber() == 1) {
            markdown.append("## ").append(sessionModel.getDate())
                    .append(" (").append(dayOfTheWeek).append(") ")
                    .append("\n");
        }

        markdown.append("### Session ").append(sessionModel.getSessionNumber()).append("\n\n")
                .append(markdownHeader).append("**Time:** \n")
                .append(emptySpaces).append("- Start: ").append(sessionModel.getStartTime()).append("\n");

        if (sessionModel.getPauseTime() != null && sessionModel.getPauseTime() != invalidTime) {
            markdown.append(emptySpaces).append("- Pause: ").append(sessionModel.getPauseTime()).append("\n");
            markdown.append(emptySpaces).append("- Resume: ").append(sessionModel.getResumeTime()).append("\n");
        }

        markdown.append(emptySpaces).append("- End: ").append(sessionModel.getStopTime()).append("\n\n")
                .append(markdownHeader).append("**Content:** \n").append(sessionModel.getContent()).append("\n\n");

        if (StringUtils.isNotBlank(sessionModel.getFeelings())) {
            markdown.append(markdownHeader).append("**Feelings:** \n").append(sessionModel.getFeelings()).append("\n");
        }

        return markdown.toString();
    }
}
