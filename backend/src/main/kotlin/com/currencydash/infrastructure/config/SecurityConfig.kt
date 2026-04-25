package com.currencydash.infrastructure.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http
            .csrf { it.disable() }
            .headers { headers ->
                headers
                    .frameOptions { it.deny() }
                    .contentTypeOptions(Customizer.withDefaults())
                    .httpStrictTransportSecurity { it.includeSubDomains(true).maxAgeInSeconds(31536000) }
                    .contentSecurityPolicy { it.policyDirectives("default-src 'self'; connect-src 'self' https://economia.awesomeapi.com.br") }
            }
            .authorizeHttpRequests { it.anyRequest().permitAll() }
        return http.build()
    }
}
