package com.currencydash.domain.port.out

import com.currencydash.domain.model.AvailableCurrency
import com.currencydash.domain.model.ExchangeRate

interface ExchangeRateGateway {
    fun fetchRates(pairCodes: List<String>): List<ExchangeRate>
    fun fetchAvailableCurrencies(): List<AvailableCurrency>
}
