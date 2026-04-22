package com.currencydash

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class CurrencyDashboardApplication

fun main(args: Array<String>) {
    runApplication<CurrencyDashboardApplication>(*args)
}
