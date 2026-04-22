package com.currencydash.infrastructure.adapter.out.api

import com.currencydash.domain.model.AvailableCurrency
import com.currencydash.domain.model.ExchangeRate
import com.currencydash.domain.port.out.ExchangeRateGateway
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId

@Component
class AwesomeApiAdapter(private val restTemplate: RestTemplate) : ExchangeRateGateway {

    private val baseUrl = "https://economia.awesomeapi.com.br/json"

    override fun fetchRates(pairCodes: List<String>): List<ExchangeRate> {
        val pairsParam = pairCodes.joinToString(",")
        val url = "$baseUrl/last/$pairsParam"

        @Suppress("UNCHECKED_CAST")
        val response = restTemplate.getForObject(url, Map::class.java) as Map<String, Map<String, String>>

        return pairCodes.mapNotNull { code ->
            val key = code.replace("-", "")
            response[key]?.let { data ->
                ExchangeRate(
                    pairCode = code.uppercase(),
                    description = data["name"] ?: code,
                    bid = data["bid"]?.toBigDecimalOrNull() ?: BigDecimal.ZERO,
                    ask = data["ask"]?.toBigDecimalOrNull() ?: BigDecimal.ZERO,
                    high = data["high"]?.toBigDecimalOrNull() ?: BigDecimal.ZERO,
                    low = data["low"]?.toBigDecimalOrNull() ?: BigDecimal.ZERO,
                    variation = data["varBid"]?.toBigDecimalOrNull() ?: BigDecimal.ZERO,
                    variationPercent = data["pctChange"]?.toBigDecimalOrNull() ?: BigDecimal.ZERO,
                    timestamp = data["timestamp"]?.toLongOrNull()?.let {
                        LocalDateTime.ofInstant(Instant.ofEpochSecond(it), ZoneId.of("America/Sao_Paulo"))
                    } ?: LocalDateTime.now()
                )
            }
        }
    }

    override fun fetchAvailableCurrencies(): List<AvailableCurrency> {
        val url = "$baseUrl/available/uniq"
        @Suppress("UNCHECKED_CAST")
        val response = restTemplate.getForObject(url, Map::class.java) as Map<String, String>
        return response.entries
            .sortedBy { it.key }
            .map { AvailableCurrency(code = it.key, name = it.value) }
    }
}
