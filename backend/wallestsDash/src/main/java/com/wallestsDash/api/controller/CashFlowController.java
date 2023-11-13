package com.wallestsDash.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.wallestsDash.api.DTO.CashFlowDTO.CashFlowCreateDTO;
import com.wallestsDash.api.DTO.CashFlowDTO.CashFlowDisplayDTO;
import com.wallestsDash.domain.service.CashFlowService;

@RestController
@RequestMapping(value = "/cashFlows")
public class CashFlowController {
	
	@Autowired
	private CashFlowService cashFlowService;
	
	@GetMapping
	public List<CashFlowDisplayDTO> listar() {
		
		return cashFlowService.findAll();
	}
	
	@GetMapping("/{cashFlowId}")
	public CashFlowDisplayDTO findById(@PathVariable Long cashFlowId) {
		
		return cashFlowService.findById(cashFlowId);
	}
	
	@GetMapping("/user/{userId}")
	public List<CashFlowDisplayDTO> listByUser(@PathVariable Long userId) {
		
		return cashFlowService.findAllByUserID(userId);
	}
	
	@GetMapping("/user/{userId}/{typeCash}")
	public List<CashFlowDisplayDTO> listByUserType(@PathVariable Long userId,@PathVariable String typeCash) {
		
		return cashFlowService.findAllByUserIDTypeCash(userId, typeCash);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CashFlowCreateDTO addCashFlow(@RequestBody CashFlowCreateDTO cashFlowCreateDTO) {
		
		return cashFlowService.saveCashFlow(cashFlowCreateDTO);
	}
	
	@PutMapping("/{cashFlowId}")
	public CashFlowDisplayDTO updateCashFlow(@RequestBody CashFlowCreateDTO cashFlowCreate, @PathVariable Long cashFlowId) {
		
		return cashFlowService.updateCashFlow(cashFlowCreate, cashFlowId);
	}
	
	@DeleteMapping("/{cashFlowId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void dateleCashFlow(@PathVariable Long cashFlowId) {
		
		cashFlowService.deleteCashFlow(cashFlowId);
	}

}
