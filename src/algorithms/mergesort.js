const MERGE = 2;
const SWAP = 1;
const COMP = 0;

function* merge(arr, l, m, r) {
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);
    const n1 = L.length, n2 = R.length;

    let i = 0, j = 0, k = l;

    // merge non-empty subarrays
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            yield [k, m+j+1, L[i], R[j], MERGE]; 
            k++, i++;
        }
        else {
            yield [k, m+j+1, R[j], R[j], MERGE];
            k++, j++;
        }
    }

    // fill up rest if one array is still non-empty
    while (i < n1) {
        yield [k, m+j, L[i], R[j], MERGE]; 
        k++, i++;
    }
    while (j < n2) {
        yield [k, m+j+1, R[j], R[j], MERGE]; 
        k++, j++;
    }
}

function* mergeSortHelper(arr, l, r) {
    if (l >= r) {
        return;
    }
    let mid = Math.floor((l + r) / 2);
    yield *mergeSortHelper(arr, l, mid);
    yield *mergeSortHelper(arr, mid + 1, r);
    yield *merge(arr, l, mid, r);
}

export default function* (size, arr) {
    yield *mergeSortHelper(arr, 0, size - 1);
}