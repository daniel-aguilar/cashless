package org.danielaguilar.cashless.supabase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sb")
public class AppController {

  @Autowired private AppService service;

  @GetMapping("/wake-up")
  public String preventPausing() {
    service.preventPausing();
    return "OK";
  }
}
