function generateThursdays() {
  let startDate = new Date("January 01, 2024");
  let endDate = new Date("February 29, 2024");
  const thursdays = [];

  let currentDate = startDate;
  while (currentDate <= endDate) {
    if (currentDate.getDay() === 4) {
      let formattedMonth = currentDate
        .toLocaleString("default", { month: "long" })
        .toLocaleLowerCase();
      let formattedDate = `${formattedMonth}-${currentDate.getDate()}-${currentDate.getFullYear()} `;
      thursdays.push(formattedDate);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return thursdays;
}

// var thursdaysSinceStart = generateThursdays();

// console.log(thursdaysSinceStart);

function generateMagicParam() {
  const today = new Date();
  const linkDate = today.getDate() - 1;
  const linkMonth = today
    .toLocaleDateString("default", { month: "long" })
    .toLocaleLowerCase();

  return `${linkMonth}-${linkDate}-${today.getFullYear()}`;
}

module.exports = { generateMagicParam, generateThursdays };
