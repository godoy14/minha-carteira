package com.wallestsDash.domain.infra.service.query;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.wallestsDash.domain.filter.HistoryChartByYearFilter;
import com.wallestsDash.domain.filter.TotalCashsByMonthYearFilter;
import com.wallestsDash.domain.model.CashFlowModel;
import com.wallestsDash.domain.model.CashFlowType;
import com.wallestsDash.domain.model.dto.estatisticas.HistoryChartByYear;
import com.wallestsDash.domain.model.dto.estatisticas.TotalCashsByMonthYear;
import com.wallestsDash.domain.service.EstatisticasService;

@Repository
public class EstatisticasQueryServiceImpl implements EstatisticasService{
	
	@Autowired
	private EntityManager manager;

	@Override
	public TotalCashsByMonthYear totalCashsByMonthYear(TotalCashsByMonthYearFilter filtro) {
		var builder = manager.getCriteriaBuilder();
		var query = builder.createQuery(TotalCashsByMonthYear.class);
		var root = query.from(CashFlowModel.class);
		var predicates = new ArrayList<Predicate>();
		
		var selection = builder.construct(TotalCashsByMonthYear.class,
				builder.sum(root.get("amount")));
		
		if (filtro.getUserId() != null) {
			predicates.add(builder.equal(root.get("user"), filtro.getUserId()));
		}
		
		if (filtro.getMonth() != null) {
			predicates.add(builder.equal(builder.function("MONTH", Integer.class, root.get("date")), filtro.getMonth()));
		}
		
		if (filtro.getYear() != null) {
			predicates.add(builder.equal(builder.function("YEAR", Integer.class, root.get("date")), filtro.getYear()));
		}
		
		if (filtro.getCashFlowType().equals("INPUT")) {
			predicates.add(root.get("typeCash").in(CashFlowType.INPUT));
		} else if (filtro.getCashFlowType().equals("OUTPUT")) {
			predicates.add(root.get("typeCash").in(CashFlowType.OUTPUT));
		} else {
			predicates.add(root.get("typeCash").in(CashFlowType.INPUT, CashFlowType.OUTPUT));
		}
		
		query.where(predicates.toArray(new Predicate[0]));
		query.select(selection);

		return manager.createQuery(query).getSingleResult();
	}

	@Override
	public List<HistoryChartByYear> historyChartByYear(HistoryChartByYearFilter filtro) {
		var builder = manager.getCriteriaBuilder();
		var query = builder.createQuery(HistoryChartByYear.class);
		var root = query.from(CashFlowModel.class);
		var predicates = new ArrayList<Predicate>();
		
		var functionGetMonthData = builder.function("MONTH", Integer.class, root.get("date"));

		
		var selection = builder.construct(HistoryChartByYear.class,
				functionGetMonthData,
				builder.sum(root.get("amount"))
				);
		
		
		
		if (filtro.getUserId() != null) {
			predicates.add(builder.equal(root.get("user"), filtro.getUserId()));
		}
		
		if (filtro.getYear() != null) {
			predicates.add(builder.equal(builder.function("YEAR", Integer.class, root.get("date")), filtro.getYear()));
		}
		
		
		if (filtro.getCashFlowType() != null && filtro.getCashFlowType().equals("INPUT")) {
			predicates.add(root.get("typeCash").in(CashFlowType.INPUT));
		}
		if (filtro.getCashFlowType() != null && filtro.getCashFlowType().equals("OUTPUT")) {
			predicates.add(root.get("typeCash").in(CashFlowType.OUTPUT));
		}
		
		query.where(predicates.toArray(new Predicate[0]));
		query.select(selection);
		query.groupBy(functionGetMonthData);
		
		return manager.createQuery(query).getResultList();
	}
}
