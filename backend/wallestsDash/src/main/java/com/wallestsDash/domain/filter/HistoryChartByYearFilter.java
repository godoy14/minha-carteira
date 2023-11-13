package com.wallestsDash.domain.filter;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class HistoryChartByYearFilter {
	
	private Integer userId;
	
	private Integer year;
	
	private String cashFlowType;

}
