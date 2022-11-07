package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalTime;

public class Export {
    public static String objectToMarkdown(SessionModel sessionModel) {
        LocalTime invalidTime = LocalTime.of(0,0,0);
        String emptySpaces = "      ";
        StringBuilder markdown = new StringBuilder();

        markdown.append(emptySpaces).append("## ").append(sessionModel.getDate()).append("\n")
                .append(emptySpaces).append("### Session ").append(sessionModel.getSessionNumber()).append("\n")
                .append(emptySpaces).append("- Start: ").append(sessionModel.getStartTime()).append("\n");

            if (sessionModel.getPauseTime() != null && sessionModel.getPauseTime() != invalidTime) {
                markdown.append(emptySpaces).append("- Pause: ").append(sessionModel.getPauseTime()).append("\n");
                markdown.append(emptySpaces).append("- Resume: ").append(sessionModel.getResumeTime()).append("\n");
            }

        markdown.append(emptySpaces).append("- End: ").append(sessionModel.getStopTime()).append("\n")
                .append(emptySpaces).append("### Content: \n").append(sessionModel.getContent()).append("\n");

            if (StringUtils.isNotBlank(sessionModel.getFeelings())) {
                markdown.append(emptySpaces).append("### Feelings: \n").append(sessionModel.getFeelings()).append("\n");
            }

        return markdown.toString();
    }
}
