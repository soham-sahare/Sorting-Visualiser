import leftButtons from './left.js';
import midButtons from './middle.js';
import rightButtons from './right.js';

export default function() {
    const optionsContainer = document.createElement('div');
    optionsContainer.id = "options";

    optionsContainer.appendChild(leftButtons());
    optionsContainer.appendChild(midButtons());
    optionsContainer.appendChild(rightButtons());

    return optionsContainer;
}