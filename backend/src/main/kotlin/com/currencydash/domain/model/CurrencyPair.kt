package com.currencydash.domain.model

enum class CurrencyPair(val code: String, val description: String) {
    USD_BRL("USD-BRL", "Dólar / Real"),
    EUR_BRL("EUR-BRL", "Euro / Real"),
    EUR_USD("EUR-USD", "Euro / Dólar")
}
