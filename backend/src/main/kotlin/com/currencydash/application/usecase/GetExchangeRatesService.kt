package com.currencydash.application.usecase

import com.currencydash.domain.model.AvailableCurrency
import com.currencydash.domain.model.ExchangeRate
import com.currencydash.domain.port.`in`.GetExchangeRatesUseCase
import com.currencydash.domain.port.out.ExchangeRateGateway
import org.springframework.stereotype.Service

@Service
class GetExchangeRatesService(
    private val gateway: ExchangeRateGateway
) : GetExchangeRatesUseCase {

    private val defaultPairs = listOf("USD-BRL", "EUR-BRL", "EUR-USD")

    override fun getDefaultRates(): List<ExchangeRate> = gateway.fetchRates(defaultPairs)

    override fun getRatesByPairs(pairCodes: List<String>): List<ExchangeRate> {
        val validCodes = pairCodes
            .map { it.uppercase().trim() }
            .filter { it.matches(Regex("[A-Z]{3}-[A-Z]{3}")) }
            .distinct()
        if (validCodes.isEmpty()) return emptyList()
        return gateway.fetchRates(validCodes)
    }

    override fun getAvailableCurrencies(): List<AvailableCurrency> = gateway.fetchAvailableCurrencies()
}
