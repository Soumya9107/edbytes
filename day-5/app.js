function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) {
    if (y === 0) throw new Error('Cannot divide by zero.');
    return x / y;
}

function calculate(op, rawA, rawB) {
    if (String(rawA).trim() === '' || String(rawB).trim() === '') {
        throw new Error('Please enter both numbers.');
    }
    const x = Number(rawA), y = Number(rawB);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        throw new Error('Both inputs must be valid numbers.');
    }
    switch (op) {
        case '+': return add(x, y);
        case '-': return subtract(x, y);
        case '*': return multiply(x, y);
        case '/': return divide(x, y);
        default: throw new Error('Unknown operation.');
    }
}

if (typeof document !== 'undefined') {
    document.getElementById('operations').onclick = e => {
        const op = e.target.dataset.op;
        if (!op) return;
        const a = document.getElementById('a').value, b = document.getElementById('b').value;
        const out = document.getElementById('result');
        try {
            out.textContent = 'Result: ' + calculate(op, a, b);
            out.className = '';
        } catch (err) {
            out.textContent = err.message;
            out.className = 'error';
        }
    };
}
if (typeof module !== 'undefined') module.exports = { add, subtract, multiply, divide, calculate };