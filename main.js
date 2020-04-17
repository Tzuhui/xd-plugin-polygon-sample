const {Polygon, Color} = require("scenegraph"); 

function PolygonCreateFunction(selection) { 
    var polygon = new Polygon();
    polygon.cornerCount = 6;
    polygon.width = 65;
    polygon.height = 56;
    polygon.fill = new Color("green");
    selection.insertionParent.addChild(polygon);
}

let panel;
function create() {
    const HTML =
        `<p>填入要更換的顏色色碼</p>
        <input type="text" id="color" value="blue" placeholder="color" />
        <button id="ok" type="submit">Change</button>
        `
    panel = document.createElement("div");
    panel.innerHTML = HTML;
    panel.querySelector("#ok").addEventListener("click", changPolygonColor);

    return panel;
}
function changPolygonColor() {
    const { editDocument } = require("application");
    const color = document.querySelector("#color").value

    editDocument(function (selection) {
        const selectedPolygon = selection.items[0];
        selectedPolygon.fill = new Color(color)
    })
}
function show(event) {
    if (!panel) event.node.appendChild(create());
}

module.exports = {
    commands: {
        createPolygon: PolygonCreateFunction
    },
    panels: {
        changePolygonColor: {
            show,
        }
    }
};