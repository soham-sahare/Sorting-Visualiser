const sortIds = {
    bubble: "Bubble", 
    selection: "Selection", 
    insertion: "Insertion", 
    quicksort: "Quicksort", 
    mergesort: "Mergesort", 
    heapsort: "Heapsort"
};

function createSort(sortId) {
    const newButton = document.createElement('div');
    newButton.classList.add('sort-button');
    newButton.id = sortId;
    newButton.textContent = sortIds[sortId];

    return newButton;
}

export default function() {
    const leftButtons = document.createElement('div');
    leftButtons.id = "left-buttons";

    const sortSelection = document.createElement('div');
    sortSelection.id = "sort-selection";

    for (const sortId in sortIds) {
        const sortButton = createSort(sortId);
        sortSelection.appendChild(sortButton);
    }

    const dot = document.createElement('div');
    dot.id = "dot";
    sortSelection.appendChild(dot);

    leftButtons.appendChild(sortSelection);
    return leftButtons;
}