package com.currencydash.infrastructure.adapter.`in`.web

import com.currencydash.domain.port.`in`.GetExchangeRatesUseCase
import com.currencydash.infrastructure.adapter.`in`.web.dto.ExchangeRateResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/currencies")
class CurrencyController(private val useCase: GetExchangeRatesUseCase) {

    @GetMapping
    fun getRates(
        @RequestParam(required = false) pairs: String?
    ): ResponseEntity<List<ExchangeRateResponse>> {
        val rates = if (pairs.isNullOrBlank()) {
            useCase.getDefaultRates()
        } else {
            useCase.getRatesByPairs(pairs.split(","))
        }
        return ResponseEntity.ok(rates.map { ExchangeRateResponse.from(it) })
    }

    @GetMapping("/available")
    fun getAvailableCurrencies(): ResponseEntity<List<Map<String, String>>> {
        val currencies = useCase.getAvailableCurrencies()
            .map { mapOf("code" to it.code, "name" to it.name) }
        return ResponseEntity.ok(currencies)
    }
}
