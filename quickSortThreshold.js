const iteration = 50; 

// Fix the set of arrays
let arraySets = [];
for (let i = 0; i < iteration; i++) {
    arraySets.push(Array.from({ length: 700000 }, () => Math.floor(Math.random() * 100 + 1)));
}

// Test with varying thresholds
const minThreshold = 30;
const maxThreshold = 50;

for(let threshold = minThreshold; threshold <= maxThreshold; threshold++) {
    averageTime(quicksortHybridC, 'HybridC’s Partition Scheme', threshold);
}

// Create a function to calculate average time for each sorting scheme
function averageTime(sortingFunction, sortingSchemeName, threshold) {
	let totalTime = 0;

	for (let i = 0; i < iteration; i++) {
		const numArray = [...arraySets[i]]; // Make a copy so original data isn't sorted
		const startTime = performance.now();

		sortingFunction(numArray, 0, numArray.length - 1, threshold);

		const endTime = performance.now();
		totalTime += endTime - startTime;
	}

	console.log(`${sortingSchemeName} with threshold ${threshold} Average Time: ${(totalTime / iteration).toFixed(4)}ms`);
}

function quicksortHybridC(array, lowIndex, highIndex, threshold) {
	if (highIndex - lowIndex + 1 < threshold) {
		insertionSort(array, lowIndex, highIndex);
	} else if (lowIndex < highIndex) {
		let pivotIndex = hybridPartitionC(array, lowIndex, highIndex);
		quicksortHybridC(array, lowIndex, pivotIndex, threshold);
		quicksortHybridC(array, pivotIndex + 1, highIndex, threshold);
	}
}

function hybridPartitionC(array, lowIndex, highIndex) {
	const pivot = array[Math.floor((lowIndex + highIndex) / 2)];
	let i = lowIndex - 1;
	let j = highIndex + 1;

	while (true) {
		do {
			i++;
		} while (array[i] < pivot);

		do {
			j--;
		} while (array[j] > pivot);

		if (i >= j) return j;

		// Swap only if the values are different
		if (array[i] !== array[j]) {
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
}

function insertionSort(array, lowIndex, highIndex) {
	for (let i = lowIndex + 1; i <= highIndex; i++) {
		let key = array[i];
		let j = i - 1;

		// Shift elements to the right to make space for the key
		while (j >= lowIndex && array[j] > key) {
			array[j + 1] = array[j];
			j--;
		}

		// If we moved some elements, place the key in its correct position
		if (j !== i - 1) {
			array[j + 1] = key;
		}
	}
}

