package com.wallestsDash.domain.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wallestsDash.api.DTO.CashFlowDTO.CashFlowCreateDTO;
import com.wallestsDash.api.DTO.CashFlowDTO.CashFlowDisplayDTO;
import com.wallestsDash.domain.Exception.DealException;
import com.wallestsDash.domain.model.CashFlowModel;
import com.wallestsDash.domain.model.UserModel;
import com.wallestsDash.domain.repository.CashFlowRepository;
import com.wallestsDash.domain.repository.UserRepository;

@Service
public class CashFlowService {
	
	@Autowired
	private CashFlowRepository cashFlowRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<CashFlowDisplayDTO> findAll(){
		List<CashFlowModel> list = cashFlowRepository.findAll();
		return list.stream().map(cashFlow -> new CashFlowDisplayDTO(cashFlow)).collect(Collectors.toList());
	}
	
	public List<CashFlowDisplayDTO> findAllByUserID(Long userId){
		List<CashFlowModel> list = cashFlowRepository.findAllByUserId(userId);
		return list.stream().map(cashFlow -> new CashFlowDisplayDTO(cashFlow)).collect(Collectors.toList());
	}
	
	public List<CashFlowDisplayDTO> findAllByUserIDTypeCash(Long userId, String typeCash){
		List<CashFlowModel> list = cashFlowRepository.findAllByUserIdTypeCash(userId, typeCash);
		return list.stream().map(cashFlow -> new CashFlowDisplayDTO(cashFlow)).collect(Collectors.toList());
	}
	
	public CashFlowDisplayDTO findById(Long cashFlowId) {
		CashFlowModel cashFlow = cashFlowRepository.findById(cashFlowId).orElseThrow(() -> new DealException(String.format("Cash Flow with id %d not found", cashFlowId)));
		
		CashFlowDisplayDTO cashFlowDisplay = new CashFlowDisplayDTO(cashFlow);
		
		return cashFlowDisplay;
	}
	
	@Transactional
	public CashFlowDisplayDTO updateCashFlow(CashFlowCreateDTO cashFlow, Long cashFlowId) {
		CashFlowModel existentCashFlow = cashFlowRepository.findById(cashFlowId).orElseThrow(() -> new DealException(String.format("Cash Flow with id %d not found", cashFlowId)));
		
		existentCashFlow.setAmount(cashFlow.getAmount());
		existentCashFlow.setDate(cashFlow.getDate());
		existentCashFlow.setDescription(cashFlow.getDescription());
		existentCashFlow.setFrequency(cashFlow.getFrequency());
		existentCashFlow.setTypeCash(cashFlow.getTypeCash());
		cashFlowRepository.save(existentCashFlow);
		
		return new CashFlowDisplayDTO(existentCashFlow);
	}
	
	@Transactional
	public CashFlowCreateDTO saveCashFlow(CashFlowCreateDTO cashFlow) {
		
		UserModel existUserModel = userRepository.findById(cashFlow.getUser().getId()).orElseThrow(() -> new DealException(String.format("Cash Flow with id %d not found", cashFlow.getUser().getId())));
		
		CashFlowModel cashFlowObj = new CashFlowModel();
		cashFlowObj.setAmount(cashFlow.getAmount());
		cashFlowObj.setDate(cashFlow.getDate());
		cashFlowObj.setDescription(cashFlow.getDescription());
		cashFlowObj.setFrequency(cashFlow.getFrequency());
		cashFlowObj.setTypeCash(cashFlow.getTypeCash());
		cashFlowObj.setUser(existUserModel);
		cashFlowObj = cashFlowRepository.save(cashFlowObj);
		
		return new CashFlowCreateDTO(cashFlowObj);
		
	}
	
	@Transactional
	public void deleteCashFlow(Long cashFlowId) {
		try {
			cashFlowRepository.deleteById(cashFlowId);
			cashFlowRepository.flush();
		} catch (Exception e) {
			throw new DealException(String.format("Cash Flow with id %d not found", cashFlowId));
		}
	}
	
	
}
