package com.currencydash.infrastructure.adapter.`in`.web

import com.currencydash.domain.model.AvailableCurrency
import com.currencydash.domain.model.ExchangeRate
import com.currencydash.domain.port.`in`.GetExchangeRatesUseCase
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import java.math.BigDecimal
import java.time.LocalDateTime

@WebMvcTest(CurrencyController::class)
class CurrencyControllerTest {

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var useCase: GetExchangeRatesUseCase

    private val mockRate = ExchangeRate(
        pairCode = "USD-BRL",
        description = "Dólar Americano/Real Brasileiro",
        bid = BigDecimal("5.20"),
        ask = BigDecimal("5.22"),
        high = BigDecimal("5.25"),
        low = BigDecimal("5.18"),
        variation = BigDecimal("0.02"),
        variationPercent = BigDecimal("0.38"),
        timestamp = LocalDateTime.now()
    )

    @Test
    fun `GET currencies sem params deve retornar cotacoes padrao`() {
        every { useCase.getDefaultRates() } returns listOf(mockRate)

        mockMvc.get("/api/v1/currencies")
            .andExpect {
                status { isOk() }
                jsonPath("$[0].pair") { value("USD-BRL") }
                jsonPath("$[0].description") { value("Dólar Americano/Real Brasileiro") }
                jsonPath("$[0].bid") { value(5.20) }
            }
    }

    @Test
    fun `GET currencies com pairs deve retornar cotacoes customizadas`() {
        every { useCase.getRatesByPairs(listOf("JPY-BRL", "GBP-USD")) } returns listOf(mockRate)

        mockMvc.get("/api/v1/currencies?pairs=JPY-BRL,GBP-USD")
            .andExpect {
                status { isOk() }
                jsonPath("$[0].pair") { value("USD-BRL") }
            }
    }

    @Test
    fun `GET currencies-available deve retornar lista de moedas`() {
        every { useCase.getAvailableCurrencies() } returns listOf(
            AvailableCurrency("USD", "Dólar Americano"),
            AvailableCurrency("EUR", "Euro"),
            AvailableCurrency("JPY", "Iene Japonês")
        )

        mockMvc.get("/api/v1/currencies/available")
            .andExpect {
                status { isOk() }
                jsonPath("$[0].code") { value("USD") }
                jsonPath("$[0].name") { value("Dólar Americano") }
                jsonPath("$.length()") { value(3) }
            }
    }
}
