package com.dohit.huick.api.banking.repayment.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class RepaymentApiDto {

	@Getter
	@NoArgsConstructor
	@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
	public static class Request {
		Long contractId;

		@Builder
		public Request(Long contractId) {
			this.contractId = contractId;
		}
	}
}
