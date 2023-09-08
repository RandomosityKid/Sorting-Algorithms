const numArrayHoare = Array.from({ length: 700000 }, () => Math.floor(Math.random() * 100 + 20));
const numArrayLomuto = [...numArrayHoare];
const numArrayHybridB = [...numArrayHoare];
const numArrayHybridC = [...numArrayHoare];

// Lomuto’s Partition Scheme
console.time('Lomuto’s Partition Scheme');
quicksortLomuto(numArrayLomuto, 0, numArrayLomuto.length - 1);
console.timeEnd('Lomuto’s Partition Scheme');

// Hoare’s Partition Scheme
console.time('Hoare’s Partition Scheme');
quicksortHoare(numArrayHoare, 0, numArrayHoare.length - 1);
console.timeEnd('Hoare’s Partition Scheme');

// HybridB's Partition Scheme
// console.time('HybridB’s Partition Scheme');
// quicksortHybridB(numArrayHybridB, 0, numArrayHybridB.length - 1);
// console.timeEnd('HybridB’s Partition Scheme');

// HybridC's Partition Scheme
console.time('HybridC’s Partition Scheme');
quicksortHybridC(numArrayHybridB, 0, numArrayHybridB.length - 1);
console.timeEnd('HybridC’s Partition Scheme');


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

function quicksortHybridC(array, lowIndex, highIndex) {
	if (highIndex - lowIndex + 1 < 10) {
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