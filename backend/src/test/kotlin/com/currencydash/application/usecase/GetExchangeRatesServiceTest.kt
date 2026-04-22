package com.currencydash.application.usecase

import com.currencydash.domain.model.AvailableCurrency
import com.currencydash.domain.model.ExchangeRate
import com.currencydash.domain.port.out.ExchangeRateGateway
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.math.BigDecimal
import java.time.LocalDateTime

class GetExchangeRatesServiceTest {

    private lateinit var gateway: ExchangeRateGateway
    private lateinit var service: GetExchangeRatesService

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

    @BeforeEach
    fun setUp() {
        gateway = mockk()
        service = GetExchangeRatesService(gateway)
    }

    @Test
    fun `getDefaultRates should call gateway with default pairs`() {
        val defaultPairs = listOf("USD-BRL", "EUR-BRL", "EUR-USD")
        every { gateway.fetchRates(defaultPairs) } returns listOf(mockRate)

        val result = service.getDefaultRates()

        assertNotNull(result)
        assertEquals(1, result.size)
        verify(exactly = 1) { gateway.fetchRates(defaultPairs) }
    }

    @Test
    fun `getRatesByPairs should fetch custom pairs`() {
        val customPairs = listOf("JPY-BRL", "GBP-USD")
        every { gateway.fetchRates(customPairs) } returns listOf(mockRate)

        val result = service.getRatesByPairs(customPairs)

        assertEquals(1, result.size)
        verify { gateway.fetchRates(customPairs) }
    }

    @Test
    fun `getRatesByPairs should filter invalid pair formats`() {
        val result = service.getRatesByPairs(listOf("INVALID", "123-456", ""))
        assertTrue(result.isEmpty())
    }

    @Test
    fun `getRatesByPairs should deduplicate pairs`() {
        every { gateway.fetchRates(listOf("USD-BRL")) } returns listOf(mockRate)

        service.getRatesByPairs(listOf("USD-BRL", "usd-brl", "USD-BRL"))

        verify(exactly = 1) { gateway.fetchRates(listOf("USD-BRL")) }
    }

    @Test
    fun `getAvailableCurrencies should delegate to gateway`() {
        val currencies = listOf(AvailableCurrency("USD", "Dólar Americano"))
        every { gateway.fetchAvailableCurrencies() } returns currencies

        val result = service.getAvailableCurrencies()

        assertEquals(1, result.size)
        assertEquals("USD", result[0].code)
    }
}
