const WEEKS_IN_YEAR = 52;
const MONTHS_IN_YEAR = 12;

export const removeArrayItem = (array, element) => array.filter(arrayElement => arrayElement !== element);

// return a new array with only objects of a type
export const getFilteredObjectsByType = (sourceObject = {}, type) =>
  Object.keys(sourceObject)
    .filter(key => sourceObject[key].type === type)
    .reduce((a, b) => [...a, sourceObject[b]], []);

export const getSumFromObjectByType = (timeframe, data, type) =>
  getFilteredObjectsByType(data, type)
    .reduce((a, b) => {
      let intB = parseFloat(b.amount.value);

      if (isNaN(intB)) {
        intB = 0;
      }

      const isMonthly = (b.timeframe.value === 'monthly');
      let annual = 0;
      let monthly = 0;
      let weekly = 0;

      if (isMonthly) {
        annual = intB * MONTHS_IN_YEAR;
        monthly = intB;
        weekly = annual / WEEKS_IN_YEAR;
      } else {
        annual = intB * WEEKS_IN_YEAR;
        monthly = annual / MONTHS_IN_YEAR;
        weekly = intB;
      }

      const sum = {
        annual: a + annual,
        monthly: a + monthly,
        weekly: a + weekly,
      };

      return sum[timeframe];
    }, 0);

export const getPieChartData = (timeframe, data, config) =>
  config.map(item => ({
    color: item.color,
    type: item.type,
    label: item.label,
    value: getSumFromObjectByType(timeframe, data, item.type),
  }));
