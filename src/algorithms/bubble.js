const SWAP = 1;
const COMP = 0;

export default function* (size, arr) {
    for (let i = 0; i < size-1; i++) {
        for (let j = 0; j < size-i-1; j++) {
            if (arr[j] > arr[j+1]) yield [j, j+1, arr[j+1], arr[j], SWAP];
            else yield [j, j+1, arr[j+1], arr[j], COMP];
        }
    }
}