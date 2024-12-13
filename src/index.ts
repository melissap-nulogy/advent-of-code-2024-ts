import { Day } from './day';
import day1 from './day1/index';
import day2 from './day2/index';
import day3 from './day3/index';
import day4 from './day4/index';
import day5 from './day5/index';
import day6 from './day6/index';
import day7 from './day7/index';
import day8 from './day8/index';
import day10 from './day10/index';
import day12 from './day12/index';
// MORE IMPORTS HERE
const days: { [key: number]: Day; } = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
  8: day8,
  10: day10,
  12: day12
  // MORE DAYS HERE
};

async function runDay (dayId: number) {
  const resultPart1 = await days[dayId].partOne();

  console.log('Part 1 result:\t', resultPart1);
  console.log('Expected:\t', days[dayId].expectedResultPart1)

  const resultPart2 = await days[dayId].partTwo();
  console.log('Part 2 result:\t', resultPart2);
  console.log('Expected:\t', days[dayId].expectedResultPart2)
}

async function runALl () {
  for (const dayId in days) {
    console.log(`Day ${dayId}`);
    await runDay(parseInt(dayId, 10));
    console.log('\n');
  }
}

const params = process.argv.splice(2);
if (params[0] === 'all') {
  runALl();
} else {
  const dayId = parseInt(params[0], 10);
  if (params.length && days[dayId] !== undefined) {
    runDay(dayId);
  } else {
    console.log('Usage: npm run start [day]');
    console.log(`Available days: [ ${Object.keys(days).map((x) => x).join(', ')} ]`);
  }
}
