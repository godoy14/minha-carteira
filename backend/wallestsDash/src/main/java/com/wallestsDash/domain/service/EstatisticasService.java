package com.wallestsDash.domain.service;

import java.util.List;

import com.wallestsDash.domain.filter.HistoryChartByYearFilter;
import com.wallestsDash.domain.filter.TotalCashsByMonthYearFilter;
import com.wallestsDash.domain.model.dto.estatisticas.HistoryChartByYear;
import com.wallestsDash.domain.model.dto.estatisticas.TotalCashsByMonthYear;

public interface EstatisticasService {
	
	TotalCashsByMonthYear totalCashsByMonthYear(TotalCashsByMonthYearFilter filter);
	
	List<HistoryChartByYear> historyChartByYear(HistoryChartByYearFilter filter);

}
