package com.academy.allps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class AllpsApplication {

	public static void main(String[] args) {
		SpringApplication.run(AllpsApplication.class, args);
	}
}
