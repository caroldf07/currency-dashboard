package com.currencydash.infrastructure.adapter.`in`.web.dto

import com.currencydash.domain.model.ExchangeRate
import java.math.BigDecimal
import java.time.LocalDateTime

data class ExchangeRateResponse(
    val pair: String,
    val description: String,
    val bid: BigDecimal,
    val ask: BigDecimal,
    val high: BigDecimal,
    val low: BigDecimal,
    val variation: BigDecimal,
    val variationPercent: BigDecimal,
    val timestamp: LocalDateTime
) {
    companion object {
        fun from(rate: ExchangeRate) = ExchangeRateResponse(
            pair = rate.pairCode,
            description = rate.description,
            bid = rate.bid,
            ask = rate.ask,
            high = rate.high,
            low = rate.low,
            variation = rate.variation,
            variationPercent = rate.variationPercent,
            timestamp = rate.timestamp
        )
    }
}
