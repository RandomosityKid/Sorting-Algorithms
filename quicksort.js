numArray = [];
const limit = 1000

for (let index = 0; index < limit; index++) {
    numArray.push(Math.floor(Math.random() * 100 + 20));
}

quicksort(numArray, 0, numArray.length - 1);

console.log(numArray);

function quicksort(array, startIndex, endIndex) {
    if (startIndex >= endIndex) {
        return;
    }

    let pivotIndex = partition(array, startIndex, endIndex);
    quicksort(array, startIndex, pivotIndex - 1);
    quicksort(array, pivotIndex + 1, endIndex);
}

function partition(array, firstIndex, lastIndex) {
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