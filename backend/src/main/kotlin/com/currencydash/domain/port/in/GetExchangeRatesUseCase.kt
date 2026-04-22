package com.currencydash.domain.port.`in`

import com.currencydash.domain.model.AvailableCurrency
import com.currencydash.domain.model.ExchangeRate

interface GetExchangeRatesUseCase {
    fun getDefaultRates(): List<ExchangeRate>
    fun getRatesByPairs(pairCodes: List<String>): List<ExchangeRate>
    fun getAvailableCurrencies(): List<AvailableCurrency>
}
