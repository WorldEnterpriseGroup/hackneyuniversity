
// cost_calculator.js
// This script computes the tuition investment based on the selected options,
// including the new HUPP eligibility section (using household income below $75K).

$(document).ready(function(){
    $('#calculateBtn').on('click', function(){
      // Retrieve user inputs
      var degree = $('#degreeLevel').val();
      var format = $('#programFormat').val();
      var residency = $('input[name="residency"]:checked').val();
      var housingOpt = $('#housingOption').val();
      var mealPlan = $('#mealPlan').val();
      // New: determine if student qualifies for HUPP discount via household income check
      var isIncomeBelow75k = $('#incomeBelow75k').is(':checked');
      
      // Define tuition mapping (values are per semester)
      // Format: { degree: { format: { domestic: value, international: value } } }
      var tuitionRates = {
        undergraduate: {
          in_person: { domestic: 12000, international: 16000 },
          hybrid:    { domestic: 11000, international: 15000 },
          online:    { domestic: 10000, international: 14000 }
        },
        graduate: {
          in_person: { domestic: 14000, international: 18000 },
          hybrid:    { domestic: 13000, international: 17000 },
          online:    { domestic: 12000, international: 16000 }
        },
        doctorate: {
          in_person: { domestic: 17000, international: 23000 },
          hybrid:    { domestic: 16000, international: 22000 },
          online:    { domestic: 15000, international: 21000 }
        }
      };
      
      // Base tuition cost from mapping
      var baseTuition = tuitionRates[degree][format][residency];
      
      // If household income is below $75K (eligible for HUPP), then apply 70% discount
      var tuitionCost = isIncomeBelow75k ? baseTuition * 0.3 : baseTuition;
      
      // Housing: if opted for luxury housing, cost is $6,000 per semester
      var housingCost = (housingOpt === "yes") ? 6000 : 0;
      
      // Meal Plan cost per semester based on selection - updated figures
      var mealPlanCost = 0;
      if(mealPlan === "basic") {
        mealPlanCost = 4000;
      } else if(mealPlan === "standard") {
        mealPlanCost = 7300;
      } else if(mealPlan === "premium") {
        mealPlanCost = 11600;
      }
      
      // Focus Pass: yearly fee depends on residency -> per semester: domestic: $200, international: $300
      var focusPassPerSemester = (residency === "domestic") ? 200 : 300;
      
      // Health Insurance: for international students only, $500 per semester.
      var healthInsurance = (residency === "international") ? 500 : 0;
      
      // Calculate total semester cost: tuition, housing, meal plan, focus pass, and health insurance
      var semesterTotal = tuitionCost + housingCost + mealPlanCost + focusPassPerSemester + healthInsurance;
      
      // Annual cost (assuming 2 semesters per academic year)
      var annualTotal = semesterTotal * 2;
      
      // Estimate monthly costs:
      // Assuming a semester lasts 4 months
      var semesterMonthly = (semesterTotal / 4).toFixed(2);
      // Annual monthly cost (annualTotal divided by 12)
      var annualMonthly = (annualTotal / 12).toFixed(2);
      
      // Build the breakdown (unordered list)
      var breakdownHTML = '';
      breakdownHTML += '<li><strong>Tuition Cost:</strong> $' + tuitionCost.toFixed(2) + ' per semester</li>';
      breakdownHTML += '<li><strong>Housing Cost:</strong> $' + housingCost.toFixed(2) + ' per semester</li>';
      breakdownHTML += '<li><strong>Meal Plan Cost:</strong> $' + mealPlanCost.toFixed(2) + ' per semester</li>';
      breakdownHTML += '<li><strong>Focus Pass:</strong> $' + focusPassPerSemester.toFixed(2) + ' per semester</li>';
      if(residency === "international"){
        breakdownHTML += '<li><strong>Health Insurance:</strong> $' + healthInsurance.toFixed(2) + ' per semester</li>';
      }
      breakdownHTML += '<li><strong>Total Semester Cost:</strong> $' + semesterTotal.toFixed(2) + '</li>';
      breakdownHTML += '<li><strong>Total Annual Cost:</strong> $' + annualTotal.toFixed(2) + '</li>';
      breakdownHTML += '<li><strong>Monthly Cost (Semester Average):</strong> $' + semesterMonthly + ' per month</li>';
      breakdownHTML += '<li><strong>Monthly Cost (Annual Average):</strong> $' + annualMonthly + ' per month</li>';
      
      // Display the results
      $('#costDetails').html(breakdownHTML);
      $('#calculatorResults').fadeIn();
    });
  });