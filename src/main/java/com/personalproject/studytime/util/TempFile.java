package com.personalproject.studytime.util;

import com.personalproject.studytime.session.SessionModel;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.*;
import java.util.List;

public class TempFile {

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


    public static ResponseEntity downloadFile(File file) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(file));
        System.out.println(reader.readLine());
        reader.close();
        System.out.println(file.getAbsolutePath());

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
