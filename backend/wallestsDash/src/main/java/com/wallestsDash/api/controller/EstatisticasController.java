package com.wallestsDash.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wallestsDash.domain.filter.HistoryChartByYearFilter;
import com.wallestsDash.domain.filter.TotalCashsByMonthYearFilter;
import com.wallestsDash.domain.model.dto.estatisticas.HistoryChartByYear;
import com.wallestsDash.domain.model.dto.estatisticas.TotalCashsByMonthYear;
import com.wallestsDash.domain.service.EstatisticasService;

@RestController
@RequestMapping(path = "/estatisticas")
public class EstatisticasController {
	
	@Autowired
	private EstatisticasService statsService;
	
	@PostMapping(path = "/total-expenses", produces = MediaType.APPLICATION_JSON_VALUE)
	public TotalCashsByMonthYear totalCashsByMonthYear(@RequestBody TotalCashsByMonthYearFilter filtro) {
		return statsService.totalCashsByMonthYear(filtro);
	}
	
	@PostMapping(path = "/history-chart-data", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<HistoryChartByYear> historyChartData(@RequestBody HistoryChartByYearFilter filtro) {
		return statsService.historyChartByYear(filtro);
	}

}
