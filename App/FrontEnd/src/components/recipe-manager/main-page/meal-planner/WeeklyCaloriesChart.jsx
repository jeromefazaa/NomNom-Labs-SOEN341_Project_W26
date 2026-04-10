function WeeklyCaloriesChart({ plannerDays, macrosByDay }) {
  const dayCalories = plannerDays.map((day) => ({
    day,
    calories: Number(macrosByDay?.[day]?.Calories ?? 0),
  }));

  const weeklyTotal = dayCalories.reduce(
    (total, { calories }) => total + calories,
    0,
  );
  const maxCalories = Math.max(...dayCalories.map(({ calories }) => calories), 1);
  const chartHeight = 180;
  const barWidth = 44;
  const barGap = 18;
  const chartWidth = dayCalories.length * (barWidth + barGap) - barGap;

  return (
    <section
      aria-label="Weekly calories chart"
      style={{ marginTop: "1.5rem" }}
    >
      <h4 style={{ marginBottom: "0.5rem" }}>Weekly Calories</h4>
      <p style={{ marginTop: 0 }}>
        Total for the week: <strong>{weeklyTotal}</strong> calories
      </p>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
        width="100%"
        height="260"
        role="img"
        aria-label="Bar chart showing calories for each day of the week"
      >
        {dayCalories.map(({ day, calories }, index) => {
          const barHeight = (calories / maxCalories) * (chartHeight - 30);
          const x = index * (barWidth + barGap);
          const y = chartHeight - barHeight;

          return (
            <g key={day}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="6"
                ry="6"
                fill="#e49610"
              />
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
              >
                {calories}
              </text>
              <text
                x={x + barWidth / 2}
                y={chartHeight + 18}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
              >
                {day.slice(0, 3)}
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

export default WeeklyCaloriesChart;
