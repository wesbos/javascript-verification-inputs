const form = document.querySelector('[name="verify"]');
const inputs = form.querySelectorAll('.inputs input');

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();
  }
}

function handleKeyDown(e) {
  const input = e.target;
  // we only care about backspace
  if (e.keyCode === 8 || e.which === 8) {
    // if we have a value we just delete that
    if (input.value) {
      input.value = '';
      // else if there is a previous sibling, clear and focus that one
    } else if (input.previousElementSibling) {
      input.previousElementSibling.value = '';
      input.previousElementSibling.focus();
    }
  }
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text');
  // loop over each input, and populate with the index of that string
  inputs.forEach((input, i) => {
    console.log(input);
    input.value = paste[i] || '';
  });
}

inputs[0].addEventListener('paste', handlePaste);

form.addEventListener('input', handleInput);
form.addEventListener('keydown', handleKeyDown);

// 1. select the text when the next input is focued
// 2. Auto submit the form if all fields are filled after a paste
