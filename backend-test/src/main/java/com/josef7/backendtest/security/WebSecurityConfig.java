//package com.josef7.backendtest.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//public class WebSecurityConfig
//{
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
//    {
//        http.authorizeHttpRequests((authorize) -> authorize
//                .anyRequest().authenticated()).cors(Customizer.withDefaults());
//
//        return http.build();
//    }
//}
