package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


public class TempFile {

    private static final Logger log = LoggerFactory.getLogger("TempFile.class");

    /**
     * @return Ex: 20221115_112115 from today date (LocalDateTime.now())
     */
    public static String getLocalDateTime() {
        String localTime = LocalDateTime.now().toString();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime date = LocalDateTime.parse(localTime, formatter);

        String replace = date.toString().replace("T", "_");
        replace = replace.replace("-", "");
        replace = replace.replace(":", "");

        return replace.substring(0, 15);
    }

    public static File createFile(List<SessionModel> list) {
        String fileContent = "";
        File markdownFile = null;
        String fileName = getLocalDateTime();


        for (SessionModel session : list) {
            fileContent += Export.exportSessionAsMarkdown(session);
            fileContent += "\n";
        }

        try {
            File tmpFile = File.createTempFile(fileName, ".md");
            FileWriter writer = new FileWriter(tmpFile);
            writer.write(fileContent);
            writer.close();
            markdownFile = tmpFile;
        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return markdownFile;
    }


    public static ResponseEntity downloadFile(File file) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(file));
        reader.close();
        log.info("File " + file.getName() + " stored at: " + file.getAbsolutePath());

        File downloadFile = new File(file.getAbsolutePath());
        InputStreamResource resource = new InputStreamResource(new FileInputStream(downloadFile));
        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + downloadFile.getName());
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");
        return ResponseEntity.ok()
                .headers(header)
                .contentLength(downloadFile.length())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(resource);
    }

}
