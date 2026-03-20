package com.charu.backend.service;

import com.charu.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public List<Map<String, Object>> getCategorySummary() {

        List<Object[]> results = repository.getCategorySummary();
        List<Map<String, Object>> list = new ArrayList<>();

        for(Object[] row : results){
            Map<String, Object> map = new HashMap<>();
            map.put("category", row[0]);
            map.put("total", row[1]);
            list.add(map);
        }

        return list;
    }

    public List<Map<String, Object>> getMonthlySummary(){

        List<Object[]> results = repository.getMonthlySummary();
        List<Map<String,Object>> list = new ArrayList<>();

        for(Object[] row : results){
            Map<String,Object> map = new HashMap<>();
            map.put("month", row[0]);
            map.put("total", row[1]);
            list.add(map);
        }

        return list;
    }

   public Double getTotalExpense() {
        Double total = repository.getTotalExpense();
        return total != null ? total : 0.0;
    }
}