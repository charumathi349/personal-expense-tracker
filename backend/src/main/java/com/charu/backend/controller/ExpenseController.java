package com.charu.backend.controller;

import com.charu.backend.model.Expense;
import com.charu.backend.repository.ExpenseRepository;
import com.charu.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000") // React frontend
public class ExpenseController {

    private final ExpenseRepository repository;

    public ExpenseController(ExpenseRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }
 @GetMapping("/{id}")
public Expense getExpenseById(@PathVariable Long id) {
    return repository.findById(id).orElse(null);
}
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return repository.save(expense);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        expense.setId(id);
        return repository.save(expense);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        repository.deleteById(id);
    }
    @Autowired
private ExpenseService service;

@GetMapping("/category-summary")
public List<Map<String,Object>> categorySummary(){
    return service.getCategorySummary();
}

@GetMapping("/monthly-summary")
public List<Map<String,Object>> monthlySummary(){
    return service.getMonthlySummary();
}

@GetMapping("/total")
public Double totalExpense(){
    return service.getTotalExpense();
}
}