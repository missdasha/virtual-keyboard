const enButtons = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
                    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
                    ['CapsLk', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
                    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650', 'Shift'],
                    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Сtrl', '&#9668', '&#9660', '&#9658'] ];

const ruButtons = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
                    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '&#92;', 'Del'],
                    ['CapsLk', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
                    ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650', 'Shift'],
                    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '&#9668', '&#9660', '&#9658']];

const ruShift = [['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '&#8592'],
                    ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'],
                    ['CapsLk', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
                    ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '&#9650', 'Shift'],
                    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '&#9668', '&#9660', '&#9658']];

const enShift = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '&#8592'],
                    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
                    ['CapsLk', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
                    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '&#9650', 'Shift'],
                    ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '&#9668', '&#9660', '&#9658']];

const keyCode = [['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
                    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
                    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
                    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
                    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']]

const special = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 
                'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

let capsLock = false;
let shift = false;

window.addEventListener('load', () => {
    createMarkup();
    if(localStorage.getItem('lang') !== null) {
        if (localStorage.getItem('lang') === 'ru') {
            createButtons(ruButtons);
        }
        else {
            createButtons(enButtons);
        }
    }
    else {
        localStorage.setItem('lang', 'en');
        createButtons(enButtons);
    }
    handlePhysicalKeyboard();
    handleVirtualKeyboard();
});

const createMarkup = () => {
    const container = document.createElement('div');
    const text = document.createElement('p');
    const textArea = document.createElement('textarea');
    const keyboard = document.createElement('div');

    container.className = "container";
    text.className = "text";
    textArea.className = "textarea";
    keyboard.className = "keyboard";

    text.innerText = "Переключение языка: левые Ctrl + Alt, на виртуальной клавиатуре: Win. Создано в ОС Windows.";
    document.body.append(container);
    document.querySelector('.container').append(text);
    document.querySelector('.container').append(textArea);
    document.querySelector('.container').append(keyboard);
}

const createButtons = (arr) => { 
    for(let i = 0; i < arr.length; i++) {
        const row = document.createElement('div');
        row.className = "keyboard__row";
        for(let j = 0; j < arr[i].length; j++) {
            const button = document.createElement('div');
            button.className = "keyboard__button";
            button.id = keyCode[i][j];
            button.innerHTML = arr[i][j];
            row.append(button);
        }
        document.querySelector('.keyboard').append(row);
    }
}

const handlePhysicalKeyboard = () => {
    window.addEventListener("keydown", (event) => {
        const textArea = document.querySelector('.textarea');
        let code = event.code;

        if(code === "Tab") {
            handleTab();
        }
        if(code === "CapsLock") {
            handleCapsLock();
        }
        if(code === "ShiftLeft" || code === "ShiftRight") {
            replaceKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift);
        }
        if(code === 'AltLeft' || code === 'AltRight') {
            event.preventDefault();
        }
        if(event.ctrlKey && event.altKey) {  
            changeLanguage();
        }
        if(isSpecial(code)) {
            textArea.focus();
        }
        else {
            printSymbols(code);
        }
        showAnimation(code);
    })
    
    window.addEventListener("keyup", (event) => {
        const buttons = document.querySelectorAll('.keyboard__button');
        buttons.forEach((btn) => {
            if(btn.id === event.code) { 
                btn.classList.toggle('pressed');
            }
        })
    })
}

const handleVirtualKeyboard = () => {
    const textArea = document.querySelector('.textarea');
    const keyboard = document.querySelector('.keyboard');
    keyboard.addEventListener("mousedown", (event) => {
        let id = event.target.id;
        if(id === "Tab") {
            handleTab();
        }
        else if(id === "MetaLeft") {
            changeLanguage();
        }
        else if(id === "ShiftLeft" || id === "ShiftRight") {
            replaceKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift);
        }
        else if(id === "Space") {
            handleSpace();
        }
        else if(id === "Enter") {
            handleEnter();
        }
        else if(id === "Backspace") {
            handleBackspace();
        }
        else if(id === "Delete") {
            handleDelete();
        }
        else if(id === "CapsLock") {
            handleCapsLock();
        }
        else if(id === 'ArrowLeft' || id === 'ArrowUp' || id === 'ArrowRight' || id === 'ArrowDown') {
            printSymbols(id);
        }
        if(isSpecial(id)) {
            textArea.focus();
        }
        else {
            printSymbols(id);
        }
        showAnimation(id);
    })

    keyboard.addEventListener("mouseup", (event) => {
        const buttons = document.querySelectorAll('.keyboard__button');
        let id = event.target.id;
        buttons.forEach((btn) => {
            if(btn.id === id) { 
                btn.classList.toggle('pressed');
            }
        })
    })
};

const printSymbols = (id) => {
    const buttons = document.querySelectorAll('.keyboard__button');
    const textArea = document.querySelector('.textarea');
    buttons.forEach((btn) => {
        if(btn.id === id) { 
            event.preventDefault();
            textArea.focus();   
            textArea.setRangeText(btn.innerHTML, textArea.selectionStart, textArea.selectionEnd, "end");
        }
    })
}

const isSpecial = (code) => {
    return special.includes(code);
}

const handleTab = () => {
    event.preventDefault();
    const textArea = document.querySelector('.textarea');
    textArea.setRangeText('    ', textArea.selectionStart, textArea.selectionEnd, "end");
}

const handleSpace = () => {
    event.preventDefault();
    const textArea = document.querySelector('.textarea');
    textArea.setRangeText(' ', textArea.selectionStart, textArea.selectionEnd, "end");
}

const handleEnter = () => {
    event.preventDefault();
    const textArea = document.querySelector('.textarea');
    textArea.setRangeText('\n', textArea.selectionStart, textArea.selectionEnd, "end");
}

const handleBackspace = () => {
    event.preventDefault();
    const textArea = document.querySelector('.textarea');
    if(textArea.selectionStart && textArea.selectionStart===textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart-1, textArea.selectionEnd);
    }
    else if(textArea.selectionStart!==textArea.selectionEnd) {
        textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd);
    }
}

const handleDelete = () => {
    event.preventDefault();
    const textArea = document.querySelector('.textarea');
    textArea.setRangeText('', textArea.selectionStart, textArea.selectionEnd+1);
}

const handleCapsLock = () => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((btn) => {
        if(btn.innerHTML.length === 1) {
            if(!capsLock) {
                btn.innerHTML = btn.innerHTML.toUpperCase();
            }
            else {
                btn.innerHTML = btn.innerHTML.toLowerCase();
            }
        }
    });
    capsLock = !capsLock;
}

const showAnimation = code => {
    const buttons = document.querySelectorAll('.keyboard__button');
    buttons.forEach((btn) => {
        if(btn.id === code) {
            btn.classList.toggle('pressed');
        }
    })
}

const changeLanguage = () => { 
    const rows = document.querySelectorAll('.keyboard__row');
    rows.forEach((row)=>{
        row.remove();
    })
    
    if (localStorage.getItem('lang') === 'ru') {
        createButtons(enButtons);
        localStorage.setItem('lang','en');
    }
    else {
        createButtons(ruButtons);
        localStorage.setItem('lang','ru');
    }
    if(capsLock) {
        capsLock = !capsLock;
        handleCapsLock();
    }
    if(shift) {
        shift = !shift;
        replaceKeyboard(localStorage.getItem('lang') === 'en' ? enShift : ruShift);
    }
}

const replaceKeyboard = arr => {
    const rows = document.querySelectorAll('.keyboard__row');
    rows.forEach((row) => {
        row.remove();
    })
    if(!shift) {
        createButtons(arr);
    }
    else {
        createButtons(localStorage.getItem('lang') === 'en' ? enButtons : ruButtons);
    }
    shift = !shift;
}

