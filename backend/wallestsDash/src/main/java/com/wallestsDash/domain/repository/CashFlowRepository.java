package com.wallestsDash.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.wallestsDash.domain.model.CashFlowModel;

@Repository
public interface CashFlowRepository extends JpaRepository<CashFlowModel, Long>{
	
	@Query("from CashFlowModel where user_id = :user")
	List<CashFlowModel> findAllByUserId(@Param("user") Long userId);
	
	@Query("from CashFlowModel where user_id = :user and type_cash = :typeCash")
	List<CashFlowModel> findAllByUserIdTypeCash(@Param("user") Long userId,@Param("typeCash") String typeCash);

}
