import './style.css';
import bubbleSort from './algorithms/bubble.js';
import selectionSort from './algorithms/selection.js';
import insertionSort from './algorithms/insertion.js';
import mergeSort from './algorithms/mergesort.js'
import quickSort from './algorithms/quicksort.js';
import heapSort from './algorithms/heapsort.js';
import render from './page/render.js';

render();

const MIN_HEIGHT = 75;
const MAX_HEIGHT = 5;
const INITIAL_SIZE = 64;
const INITIAL_DELAY = 10;
const DEFAULT_COLOR = 'white';
const COMP_COLOR = '#fddb3a';
const SORTED_COLOR = '#00c900';
const MERGE = 2;
const SWAP = 1;
const COMP = 0;

let arr = [];       // Container of bar heights
let choice = "";    // Choice of sort
let size = INITIAL_SIZE;
let delay = INITIAL_DELAY;

// Store position of dots.
const positions = {
    bubble: 8.33,
    selection: 25,
    insertion: 41.66,
    quicksort: 58.33,
    mergesort: 75,
    heapsort: 91.66
};

const randHeight = () => Math.random() * (MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT;
const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay));

let abort = false;      // Sort is stopped
let sorted = false;     // Array is sorted
let sorting = false;    // Array is being sorted
let paused = false;     // Sorting is paused
let chosen = false;     // Sort is selected

function computeWidth() {
    return 100 / size;
}

const sizeSlider = document.querySelector('#size-slider');
sizeSlider.addEventListener('input', async (e) => {
    size = e.srcElement.value;
    abort = true;
    await sleep(delay + 10);
    randomise();
});

const speedSlider = document.querySelector('#speed-slider');
speedSlider.addEventListener('input', (e) => {
    delay = 1000 / (e.srcElement.value * e.srcElement.value);
});

// Randomises array and displays on page.
function randomise() {
    arr = [];
    document.querySelector('#array-container').innerHTML = "";
    for (let i = 0; i < size; i++) {
        let h = randHeight();
        arr.push(h);
        const element = document.createElement('div');
        element.classList.add('array-elem');
        element.dataset.index = i
        element.style['height'] = `${h}vh`;
        element.style['width'] = `${computeWidth()}%`;
        arrayContainer.appendChild(element);
    }
    abort = false;
    sorted = false;
    sorting = false;
    paused = false;
    sortButton.textContent = 'Sort';
}

function changeChoice(e) {
    const chosenButton = e.srcElement;
    choice = chosenButton.id;

    // Remove previous active classes
    sortButtons.forEach(button => button.classList.remove('active'));

    // Activate dot and position
    chosenButton.classList.add('active');
    dot.classList.add('active');
    dot.style.left = `${positions[choice]}%`;

    chosen = true;
}

// Visualise array element a and b.
function visualise(a, b) {
    const item1 = document.querySelector(`[data-index='${a}']`);
    const item2 = document.querySelector(`[data-index='${b}']`);
    item1.style['background-color'] = COMP_COLOR;
    item2.style['background-color'] = COMP_COLOR;
}

// a and b are indices of arr and data-index.
// Swap places in arr and swap places on DOM.
function swap(a, b, h1, h2) {
    // Clear colours
    clear();

    arr[a] = h1;
    arr[b] = h2;
    const item1 = document.querySelector(`[data-index='${a}']`);
    const item2 = document.querySelector(`[data-index='${b}']`);
    item1.style['height'] = `${h1}vh`;
    item2.style['height'] = `${h2}vh`;
}

// Only alters height of one item.
function merge(a, h) {
    clear();
    arr[a] = h;
    const item = document.querySelector(`[data-index='${a}']`);
    item.style['height'] = `${h}vh`;
}

function chooseSort() {
    if (choice === 'bubble') return bubbleSort(size, arr);
    if (choice === 'selection') return selectionSort(size, arr);
    if (choice === 'insertion') return insertionSort(size, arr);
    if (choice === 'mergesort') return mergeSort(size, arr);
    if (choice === 'quicksort') return quickSort(size, arr);
    if (choice === 'heapsort') return heapSort(size, arr);
}

async function flourish() {
    const items = document.querySelectorAll('.array-elem');
    const itemsArray = Array.from(items);
    for (let i = 0; i < itemsArray.length; i++) {
        itemsArray[i].style['background-color'] = SORTED_COLOR;
        await sleep(10);
    }
    sorted = sorting ? true : false;
    sortButton.textContent = 'Sort';
}

function clear() {
    const items = document.querySelectorAll('.array-elem');
    items.forEach(item => item.style['background-color'] = DEFAULT_COLOR);
}

async function sort() {
    if (sorted) return;
    const process = chooseSort();
    for (const [a, b, h1, h2, action] of process) {
        if (paused) {
            while (paused) await sleep(1);
        }
        if (abort) return;
        if (action === COMP) {
            visualise(a, b);
            await sleep(delay);
            clear();
        }
        if (action === SWAP) {
            visualise(a, b);
            await sleep(delay);
            swap(a, b, h1, h2);
        }
        if (action === MERGE) {
            visualise(a, b);
            await sleep(delay);
            merge(a, h1);
        }
    }
    flourish();
}

const randomButton = document.querySelector('#randomise');
randomButton.addEventListener('click', async () => {
    abort = true;
    await sleep(delay + 10);
    randomise();
});

const sortButton = document.querySelector('#sort-button');
sortButton.addEventListener('click', async () => {
    if (!chosen || sorted) return;
    if (sorting) {
        if (paused) {
            paused = false;
            sortButton.textContent = 'Pause';
        } else {
            paused = true;
            sortButton.textContent = 'Resume';
        }
    } else {
        sortButton.textContent = 'Pause';
        sorting = true;
        sort();
    }
});

const sortButtons = document.querySelector('#sort-selection').querySelectorAll('.sort-button');
sortButtons.forEach(button => button.addEventListener('click', (e) => {
    changeChoice(e);
    sortButton.classList.remove('inactive');
}));

const arrayContainer = document.querySelector('#array-container');
const dot = document.querySelector('#dot');

// Initialise
randomise();
