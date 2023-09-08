const iteration = 200;  // The number of times each sorting function will run.

// Generate the array sets
let arraySets = [];
for (let i = 0; i < iteration; i++) {
    arraySets.push(Array.from({ length: 700000 }, () => Math.floor(Math.random() * 10000 + 20)));
}

// Create a function to calculate average time for each sorting scheme
function averageTime(sortingFunction, sortingSchemeName) {
	let totalTime = 0;

	for (let i = 0; i < iteration; i++) {
		const numArray = [...arraySets[i]]; // Make a copy so original data isn't sorted
		const startTime = performance.now();

		sortingFunction(numArray, 0, numArray.length - 1);

		const endTime = performance.now();
		totalTime += endTime - startTime;
	}

	console.log(`${sortingSchemeName} Average Time: ${(totalTime / iteration).toFixed(4)}ms`);
}

// averageTime(quicksortLomuto, 'Lomuto’s Partition Scheme');
averageTime(quicksortHoare, 'Hoare’s Partition Scheme');
averageTime(quicksortHybridC, 'HybridC’s Partition Scheme');
averageTime(quicksortHybridD, 'HybridD’s Partition Scheme');
// averageTime(quicksortHybridB, 'HybridB’s Partition Scheme');


/* #region  Hoare */
function quicksortHoare(array, left, right) {
	if (left < right) {
		let pivotIndex = hoarePartition(array, left, right);
		quicksortHoare(array, left, pivotIndex);
		quicksortHoare(array, pivotIndex + 1, right);
	}
}

function hoarePartition(arr, lowIndex, highIndex) {
	const pivot = arr[Math.floor((lowIndex + highIndex) / 2)];
	let i = lowIndex - 1;
	let j = highIndex + 1;

	while (true) {
		do {
			i++;
		} while (arr[i] < pivot);

		do {
			j--;
		} while (arr[j] > pivot);

		if (i >= j) return j;
		[arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
	}
}
/* #endregion */

/* #region  Lomuto */
function quicksortLomuto(array, startIndex, endIndex) {
	if (startIndex >= endIndex) {
		return;
	}

	let pivotIndex = lomutoPartition(array, startIndex, endIndex);
	quicksortLomuto(array, startIndex, pivotIndex - 1);
	quicksortLomuto(array, pivotIndex + 1, endIndex);
}

function lomutoPartition(array, firstIndex, lastIndex) {
	const medianIndex = Math.floor((firstIndex + lastIndex) / 2);

	const x = array[firstIndex] - array[medianIndex];
	const y = array[medianIndex] - array[lastIndex];
	const z = array[firstIndex] - array[lastIndex];

	let tempIndex;
	if (x * y > 0) {
		tempIndex = medianIndex;
	} else {
		if (x * z > 0) {
			tempIndex = lastIndex;
		} else {
			tempIndex = firstIndex;
		}
	}

	// Swap tempIndex with last element
	[array[tempIndex], array[lastIndex]] = [array[lastIndex], array[tempIndex]];

	let pivot = array[lastIndex];
	let i = firstIndex - 1;
	for (let j = firstIndex; j < lastIndex; j++) {
		if (array[j] < pivot) {
			i++;
			[array[j], array[i]] = [array[i], array[j]];
		}
	}

	[array[i + 1], array[lastIndex]] = [array[lastIndex], array[i + 1]];

	return i + 1; // Return the pivot index
}
/* #endregion */

/* #region  HybridB */
function quicksortHybridB(array, lowIndex, highIndex) {
	if (lowIndex < highIndex) {
		let pivotIndex = hybridPartitionB(array, lowIndex, highIndex);
		quicksortHybridB(array, lowIndex, pivotIndex);
		quicksortHybridB(array, pivotIndex + 1, highIndex);
	}
}

function hybridPartitionB(array, lowIndex, highIndex) {
	const midIndex = Math.floor((lowIndex + highIndex) / 2);
	let pivotIndex;
	// const tempLowIndex = array[lowIndex];
	// const tempHighIndex = array[highIndex];
	// const tempMidIndex = array[midIndex];

	if ((array[lowIndex] <= array[midIndex] && array[midIndex] <= array[highIndex]) ||
		(array[highIndex] <= array[midIndex] && array[midIndex] <= array[lowIndex])) {
		pivotIndex = midIndex;
	} else if ((array[midIndex] <= array[lowIndex] && array[lowIndex] <= array[highIndex]) ||
		(array[highIndex] <= array[lowIndex] && array[lowIndex] <= array[midIndex])) {
		pivotIndex = lowIndex;
	} else {
		pivotIndex = highIndex;
	}

	const pivot = array[pivotIndex];

	// Swap only if necessary
	if (pivotIndex !== highIndex && array[pivotIndex] !== array[highIndex]) {
		[array[pivotIndex], array[highIndex]] = [array[highIndex], array[pivotIndex]];
	}

	let i = lowIndex - 1;
	let j = highIndex + 1;

	while (true) {
		do {
			i++;
		} while (array[i] < pivot);

		do {
			j--;
		} while (array[j] > pivot);

		// const tempiValue = array[i];
		// const tempjValue = array[j];
		if (i >= j) return j;

		// if(array[i] == array[j]){
		// 	const tempSame = array[i];
		// }

		// Swap only if the values are different
		if (array[i] !== array[j]) {
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
}
/* #endregion */

/* #region  HybridC */
function quicksortHybridC(array, lowIndex, highIndex) {
	if (highIndex - lowIndex + 1 < 50) {
		insertionSort(array, lowIndex, highIndex);
	} else if (lowIndex < highIndex) {
		let pivotIndex = hybridPartitionC(array, lowIndex, highIndex);
		quicksortHybridC(array, lowIndex, pivotIndex);
		quicksortHybridC(array, pivotIndex + 1, highIndex);
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
/* #endregion */

function quicksortHybridD(array, lowIndex, highIndex) {
	if (highIndex - lowIndex + 1 < 80) {
		insertionSort(array, lowIndex, highIndex);
	} else if (lowIndex < highIndex) {
		let pivotIndex = hybridPartitionC(array, lowIndex, highIndex);
		quicksortHybridD(array, lowIndex, pivotIndex);
		quicksortHybridD(array, pivotIndex + 1, highIndex);
	}
}