package com.wallestsDash.domain.filter;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TotalCashsByMonthYearFilter {
	
	private Long userId;
	
	private Integer month;
	
	private Integer year;
	
	private String cashFlowType;

}
