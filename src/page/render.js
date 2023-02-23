import options from '../settings/options.js';

export default function() {
    document.body.appendChild(options());
        
    const arrayContainer = document.createElement('div');
    arrayContainer.id = "array-container";

    document.body.appendChild(arrayContainer);
}