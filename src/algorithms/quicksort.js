const SWAP = 1;
const COMP = 0;

// Naive quicksort

function* partition(arr, l, h, pivot) {
    let i = l + 1, j = h;
    while (true) {
        while(arr[i] <= pivot && i < j) i++;
        while (arr[j] >= pivot && i < j) j--;
        if (i === j) break;
        yield [i, j, arr[j], arr[i], SWAP];
    }
}

function* quickSortHelper(arr, l, h) {
    if (h <= l) return;
    let pivot = arr[l];
    yield* partition(arr, l, h, pivot);

    // fix pivot element position
    let i = l + 1;
    while (arr[i] <= pivot && i < h) {
        i++;
    }
    if (arr[i] > pivot) i--;
    yield [l, i, arr[i], pivot, SWAP];

    // recursively sort left and right
    yield *quickSortHelper(arr, l, i-1);
    yield *quickSortHelper(arr, i+1, h);
}

export default function* (size, arr) {
    yield *quickSortHelper(arr, 0, size - 1);
}
