const numArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100 + 20));

quicksort(numArray, 0, numArray.length - 1);
console.log("After sorting:", numArray);

function quicksort(array, lowIndex, highIndex) {
    if (lowIndex < highIndex) {
        let pivotIndex = hybridPartition(array, lowIndex, highIndex);
        quicksort(array, lowIndex, pivotIndex);
        quicksort(array, pivotIndex + 1, highIndex);
    }
}

function hybridPartition(array, lowIndex, highIndex) {
    const pivot = array[Math.floor((lowIndex + highIndex) / 2)];

	const x = array[lowIndex] - array[pivot];
    const y = array[pivot] - array[highIndex];
    const z = array[lowIndex] - array[highIndex];

    const tempIndex = 
	(x * y > 0) ? pivot :
    (x * z > 0) ? highIndex :
    lowIndex;

	//Swap elements at tempIndex with the pivot
	[array[tempIndex], array[pivot]] = [array[pivot], array[tempIndex]];


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
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
}