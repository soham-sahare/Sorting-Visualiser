export default function() {
    const rightButtons = document.createElement('div');
    rightButtons.id = "right-buttons";

    const sortButton = document.createElement('button');
    sortButton.id = "sort-button";
    sortButton.classList.add('inactive');
    sortButton.textContent = "Sort";

    const randomButton = document.createElement('button')
    randomButton.id = "randomise";
    randomButton.textContent = "Randomise";

    rightButtons.appendChild(sortButton);
    rightButtons.appendChild(randomButton);
    return rightButtons;
}