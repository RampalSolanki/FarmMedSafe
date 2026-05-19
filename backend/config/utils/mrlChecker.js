export const checkMRLEntry = (medicine, doseGiven, animalWeight) => {
  const doseValue = doseGiven.value;
  const standardMax = medicine.standardDose?.max;

  if (!standardMax || standardMax === 0) {
    return {
      status: 'warning',
      message: '⚠️ No standard dose or withdrawal data is available for this medicine. Record the entry, but consult a veterinarian for proper dosing.',
      withdrawalEndDate: null
    };
  }

  let status = 'safe';
  let message = '';
  let withdrawalEndDate = null;

  // Calculate if dose exceeds standard
  if (doseValue > standardMax) {
    const excessPercent = ((doseValue - standardMax) / standardMax) * 100;

    if (excessPercent <= 20) {
      status = 'warning';
      message = `⚠️ Dose is ${excessPercent.toFixed(0)}% above standard. Monitor animal closely.`;
    } else {
      status = 'unsafe';
      message = `🚫 CRITICAL: Dose is ${excessPercent.toFixed(0)}% above standard! DO NOT use milk/meat.`;
    }
  } else {
    message = `✅ Dose within safe limits. Withdrawal period: ${medicine.withdrawalPeriod.milk} days for milk, ${medicine.withdrawalPeriod.meat} days for meat.`;
    status = 'safe';
  }

  // Calculate withdrawal end date
  if (medicine.withdrawalPeriod && medicine.withdrawalPeriod.milk) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + medicine.withdrawalPeriod.milk);
    withdrawalEndDate = endDate;
  }

  return { status, message, withdrawalEndDate };
};