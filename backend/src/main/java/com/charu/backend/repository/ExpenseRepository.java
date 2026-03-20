package com.charu.backend.repository;

import com.charu.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> getCategorySummary();

    // Monthly expense (Fixed)
    @Query("SELECT FUNCTION('MONTH', e.date), SUM(e.amount) FROM Expense e GROUP BY FUNCTION('MONTH', e.date)")
    List<Object[]> getMonthlySummary();

    // Total expense
    @Query("SELECT SUM(e.amount) FROM Expense e")
    Double getTotalExpense();  
}