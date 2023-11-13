package com.wallestsDash.domain.model;

import java.time.LocalDate;
import java.time.OffsetDateTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class CashFlowModel {
	
	@Id
	@EqualsAndHashCode.Include
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	private String description;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private CashFlowFrequency frequency;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	private CashFlowType typeCash;
	
	@NotNull
	private Double amount;
	
	@NotNull
	private LocalDate date;
	
	@CreationTimestamp
	private OffsetDateTime createdAt;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserModel user;
	
}
