document.addEventListener('DOMContentLoaded', function() {
    // Get all input fields
    const inputs = document.querySelectorAll('input');
    
    // Add event listeners to all inputs
    inputs.forEach(input => {
        input.addEventListener('input', calculateROI);
    });

    // Initial calculation
    calculateROI();

    function calculateROI() {
        const values = {
            revenue: Number(document.getElementById('revenue').value),
            hourlyRate: Number(document.getElementById('hourlyRate').value),
            teamSize: Number(document.getElementById('teamSize').value),
            teamHourlyRate: Number(document.getElementById('teamHourlyRate').value),
            hoursOnPM: Number(document.getElementById('hoursOnPM').value),
            teamTimeWaste: Number(document.getElementById('teamTimeWaste').value),
            projectDelays: Number(document.getElementById('projectDelays').value),
            firefighting: Number(document.getElementById('firefighting').value)
        };

        // Calculate costs
        const pmWeeklyCost = values.hoursOnPM * values.hourlyRate;
        const teamWasteWeeklyCost = values.teamTimeWaste * values.teamHourlyRate * values.teamSize;
        const firefightingWeeklyCost = values.firefighting * values.hourlyRate;
        const delaysMonthlyRevenueLoss = (values.revenue / 12) * (values.projectDelays / 52);

        const pmAnnualCost = pmWeeklyCost * 52;
        const teamWasteAnnualCost = teamWasteWeeklyCost * 52;
        const delaysAnnualCost = delaysMonthlyRevenueLoss * 12;
        const firefightingAnnualCost = firefightingWeeklyCost * 52;

        const totalAnnualLoss = pmAnnualCost + teamWasteAnnualCost + delaysAnnualCost + firefightingAnnualCost;
        const monthlyLoss = totalAnnualLoss / 12;
        const projectedROI = ((totalAnnualLoss * 0.7) - 10000) / 10000 * 100;

        // Update results
        document.getElementById('pmCost').textContent = formatCurrency(pmAnnualCost);
        document.getElementById('teamWasteCost').textContent = formatCurrency(teamWasteAnnualCost);
        document.getElementById('delaysCost').textContent = formatCurrency(delaysAnnualCost);
        document.getElementById('firefightingCost').textContent = formatCurrency(firefightingAnnualCost);
        document.getElementById('totalAnnualLoss').textContent = formatCurrency(totalAnnualLoss);
        document.getElementById('monthlyLoss').textContent = formatCurrency(monthlyLoss);
        document.getElementById('projectedROI').textContent = `${Math.round(projectedROI)}%`;

        // Update ROI emoji
        const roiEmoji = document.getElementById('roiEmoji');
        if (projectedROI > 0) {
            roiEmoji.textContent = projectedROI > 500 ? '🚀' : 
                                 projectedROI > 300 ? '⭐' : 
                                 projectedROI > 100 ? '📈' : '✨';
        } else {
            roiEmoji.textContent = '';
        }
    }

    function formatCurrency(value) {
        return '$' + Math.round(value).toLocaleString();
    }
});
