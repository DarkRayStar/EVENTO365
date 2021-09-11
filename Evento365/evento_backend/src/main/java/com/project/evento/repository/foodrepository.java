package com.project.evento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.project.evento.model.food;




@Repository
public interface foodrepository extends JpaRepository<food, Long>{

	@Query(value = "select * from food where foodcategoryid like %:value%" ,nativeQuery = true)
	public List<food> retrievefood2(@Param("value") String value);
	
		
	//@Query("select f from food f where f.foodid=:id or f.foodcategoryid=:value")
	//public List<food> retrievefood2(@Param("id")Long id,@Param("value") String value);
}
