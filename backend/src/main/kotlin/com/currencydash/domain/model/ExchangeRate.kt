package com.currencydash.domain.model

import java.math.BigDecimal
import java.time.LocalDateTime

data class ExchangeRate(
    val pairCode: String,
    val description: String,
    val bid: BigDecimal,
    val ask: BigDecimal,
    val high: BigDecimal,
    val low: BigDecimal,
    val variation: BigDecimal,
    val variationPercent: BigDecimal,
    val timestamp: LocalDateTime
)
