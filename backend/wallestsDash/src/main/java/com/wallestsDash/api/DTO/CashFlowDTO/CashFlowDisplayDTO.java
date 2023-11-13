package com.wallestsDash.api.DTO.CashFlowDTO;

import java.time.LocalDate;

import com.wallestsDash.domain.model.CashFlowFrequency;
import com.wallestsDash.domain.model.CashFlowModel;
import com.wallestsDash.domain.model.CashFlowType;
import com.wallestsDash.domain.model.UserModel;

import lombok.Data;

@Data
public class CashFlowDisplayDTO {
	
	private Long id;
	
	private String description;
	
	private CashFlowType typeCash;
	
	private CashFlowFrequency frequency;
	
	private Double amount;
	
	private LocalDate date;
	
	private UserModel user;
	
	public CashFlowDisplayDTO() {
		
	}

	public CashFlowDisplayDTO(Long id, String description, CashFlowType typeCash, CashFlowFrequency frequency, Double amount,
			LocalDate date, UserModel user) {
		super();
		this.id = id;
		this.description = description;
		this.typeCash = typeCash;
		this.frequency = frequency;
		this.amount = amount;
		this.date = date;
		this.user = user;
	}
	
	public CashFlowDisplayDTO(CashFlowModel cashFlow) {
		super();
		this.id = cashFlow.getId();
		this.description = cashFlow.getDescription();
		this.typeCash = cashFlow.getTypeCash();
		this.frequency = cashFlow.getFrequency();
		this.amount = cashFlow.getAmount();
		this.date = cashFlow.getDate();
		this.user = cashFlow.getUser();
	}

}
