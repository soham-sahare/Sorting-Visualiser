function createSlider(id, text, min, max, value) {
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add("slider-container");

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = text;

    const input = document.createElement('input');
    input.id = id;
    input.type = 'range';
    input.classList.add('slider');
    input.setAttribute('min', min);
    input.setAttribute('max', max);
    input.setAttribute('value', value);

    sliderContainer.appendChild(label);
    sliderContainer.appendChild(input);

    return sliderContainer;
}

export default function() {
    const midButtons = document.createElement('div');
    midButtons.id = "middle-buttons";

    const sliders = document.createElement('div');
    sliders.id = "sliders";
    sliders.appendChild(createSlider("size-slider", "Size", "8", "128", "64"));
    sliders.appendChild(createSlider("speed-slider", "Speed", "1", "20", "10"));

    midButtons.appendChild(sliders);
    return midButtons; 
}