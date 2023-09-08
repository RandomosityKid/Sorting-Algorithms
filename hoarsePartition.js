const numArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100 + 20));

quicksort(numArray, 0, numArray.length - 1);
console.log("After sorting:", numArray);

function quicksort(array, lowIndex, highIndex) {
    if (lowIndex < highIndex) {
        let pivotIndex = hoarePartition(array, lowIndex, highIndex);
        quicksort(array, lowIndex, pivotIndex);
        quicksort(array, pivotIndex + 1, highIndex);
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