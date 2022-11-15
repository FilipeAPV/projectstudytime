package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class CreateTempFile {

        public static File createFile(List<SessionModel> list) {
        String fileContent = "";
        File markdownFile = null;

        for (SessionModel session:list) {
            fileContent += Export.objectToMarkdown(session);
            fileContent += "\n";
        }

        try {
            File tmpFile = File.createTempFile("test", ".md");
            FileWriter writer = new FileWriter(tmpFile);
            writer.write(fileContent);
            writer.close();
            markdownFile = tmpFile;
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        return markdownFile;
    }
}
