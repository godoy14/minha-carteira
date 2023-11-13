package com.wallestsDash.domain.model.dto.estatisticas;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
public class HistoryChartByYear {
	
	private Integer monthNumber;
	
	private Double amount;

}
