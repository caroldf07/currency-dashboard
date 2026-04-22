package com.currencydash.infrastructure.adapter.out.api.dto

import com.fasterxml.jackson.annotation.JsonProperty

data class AwesomeApiCurrencyData(
    @JsonProperty("code") val code: String,
    @JsonProperty("codein") val codeIn: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("high") val high: String,
    @JsonProperty("low") val low: String,
    @JsonProperty("varBid") val varBid: String,
    @JsonProperty("pctChange") val pctChange: String,
    @JsonProperty("bid") val bid: String,
    @JsonProperty("ask") val ask: String,
    @JsonProperty("timestamp") val timestamp: String,
    @JsonProperty("create_date") val createDate: String
)
