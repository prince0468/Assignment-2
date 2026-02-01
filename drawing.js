const svg = document.getElementById("canvas");
const countText = document.getElementById("count");

let paths = [];
let drawing = false;
let currentPath = null;

function getMousePos(evt){
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function start(event){
    drawing = true;

    const pos = getMousePos(event);

    currentPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

    currentPath.setAttribute("d", `M ${pos.x} ${pos.y}`);
    currentPath.setAttribute("stroke", "blue");
    currentPath.setAttribute("stroke-width", "3");
    currentPath.setAttribute("fill", "none");
    currentPath.setAttribute("stroke-linecap", "round");
    currentPath.setAttribute("stroke-linejoin", "round");

    svg.appendChild(currentPath);
}

function move(event) {
    if (!drawing) return;

    const pos = getMousePos(event);
    const d = currentPath.getAttribute("d");

    currentPath.setAttribute("d", d + ` L ${pos.x} ${pos.y}`);
}

function end() {
    if (!drawing) return;

    drawing = false;
    paths.push(currentPath);
    countText.innerText = paths.length;
    currentPath = null;
}

function undo() {
    if (paths.length > 0) {
        svg.removeChild(paths.pop());
        countText.innerText = paths.length;
    }
}

function resetCanvas() {
    svg.innerHTML = "";
    paths = [];
    countText.innerText = 0;
}

svg.addEventListener("mousedown", start);
svg.addEventListener("mousemove", move);
window.addEventListener("mouseup", end);
