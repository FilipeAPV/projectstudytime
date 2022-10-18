package com.personalproject.studytime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class testcontroller {

    @Autowired
    private repo repo;

    @GetMapping("/")
    public String showPage(Model model) {

        entitytest entitytest1 = new entitytest();
        entitytest1.setText("test saved on db");
        repo.save(entitytest1);

        String strFromDb = repo.findById(1).get().getText();

        model.addAttribute("att", strFromDb);

        return "index";
    }

}
