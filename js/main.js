let parent = document.createElement("input");
addElement("", parent, "placeholder", "Enter Parent Name");
let nextButton = document.createElement("button");
let backButton = document.createElement("button");

addElement(parent, nextButton, "name", "nextButton");
addElement(parent, backButton, "name", "backButton");
backButton.style.display = "none";
backButton.before(document.createElement("br"));

nextButton.innerHTML = "Next >";
backButton.innerHTML = "< Back";

let clickCase = "addYesNOField";
let hasChild;
let childrenInput;
let totalChildrenCommission = 0;
let parentCommission = 0;

nextButton.addEventListener("click", function () {
    switch (clickCase) {
        case "addYesNOField": // Adds parent
            if (addYesNOField(parent.value.trim()) == 200) {
                backButton.style.display = "unset";
                parent.setCustomValidity("");
            }
            break;
            
        case "userInput": // When user enters yes or no
            handleYesNo();
            break;
            
        case "handleChilds": // If parent entered on Yes
            handleChildren();
            break;

        default:
            break;
    }

});

backButton.addEventListener("click", function () {
    switch (clickCase) {
        case "addYesNOField": //If user is entering parent name
            alert("If user is entering parent name")
            break;
            
        case "userInput": // When user is entering yes or no
            document.getElementById("yesNo").remove();
            clickCase = "addYesNOField";
            backButton.style.display = "none";
            break;

        case "handleChilds": // When user is entering children names
            document.getElementById("childInput").remove();
            clickCase = "userInput";
            break;

        default:
            break;
    }
});

/*
 * If user enters Y or N. Then this function is called.
 * @returns {undefined}
 */

function handleYesNo() {
    let userInput = document.getElementById("userInput");
    if (userInput.value === "Y" || userInput.value === "y") {
        clickCase = "handleChilds"; //Changes switch case
        let div = document.createElement("div");
        addElement(document.getElementById("yesNo"), div, "id", "childInput");
        childrenInput = document.createElement("input");
        /*
         * Creates paragraph to tell user to enter child information
         */
        let p = document.createElement("p");
        p.innerText = "Enter childNames seperated by comma(,)";

        addChild(div, p, "", "");
        addChild(div, childrenInput, "placeholder", "Example1, Example2, etc.");

    } else if (userInput.value === "N" || userInput.value === "n") {
        parentCommission = calculatePercentage(5);
        alert("Parent Commission: " + parentCommission);
    } else {
        alert("Incorrect input");
    }
}
/*
 * Takes input from enter children name field and performs operation of calculating commission. 
 */
function handleChildren() {
    try {
        let arrChildren = childrenInput.value.split(",");
        let totalChildren = arrChildren.length + 1;
        for (let i = 0; i < arrChildren.length; i++) {
            if (arrChildren[i] != "") {
                totalChildrenCommission += parseInt(calculatePercentage(10));
            } else {
                totalChildren -= 1;
            }
        }
        parentCommission = parseInt(calculatePercentage(5));
        parentCommission += totalChildrenCommission;
        if (confirm("Total Members: " + totalChildren + "\nParent Commission: " + parentCommission + "\nClick ok to start again!")) {
            location.reload();
        }else{
            parentCommission = 0;
            totalChildrenCommission = 0;
        }
    } catch (e) {
        console.log(e);
    } finally {
        return;
    }
}
/*
 * Calculates commission percentage of 5000
 */
function calculatePercentage(percentage) {
    return (5000 / 100) * percentage;
}

/*
 * Adds field that asks that parent has child or not
 * @param {type} parentName
 * @returns {Number}
 */

function addYesNOField(parentName) {
    if (parentName != "") {
        let div = document.createElement("div");
        addElement(parent, div, "id", "yesNo");
        let p = document.createElement("p");
        addChild(div, p, "", "");
        p.innerText = "Do parent has childern?";
        hasChild = document.createElement("input");
        addChild(div, hasChild, "placeholder", "Enter Y or N");
        let attr = document.createAttribute("id");
        attr.value = "userInput";
        hasChild.setAttributeNode(attr);
        firstClick = false;
        clickCase = "userInput";
        return 200;
    } else {
        parent.focus();
        parent.setCustomValidity("This field cannot be empty");
        return -1;
    }

}

/*
 * adds element inside parent element.
 * @param {type} parent
 * @param {type} element
 * @param {type} attribute
 * @param {type} attrValue
 * @returns {undefined}
 */
function addChild(parent, element, attribute, attrValue) {
    parent.appendChild(element);
    if (attribute != "" || attrValue != "") {
        let attr = document.createAttribute(attribute);
        attr.value = attrValue;
        element.setAttributeNode(attr);
    }
}
/*
 * Adds html element to body after prevElement
 * attribute is the html attribute of html element
 * attrValue is the attribute value of html document
 */
function addElement(prevElement, element, attribute, attrValue) {
    if (prevElement != "") {
        prevElement.after(element);
        if (attribute != "" || attrValue != "") {
            let attr = document.createAttribute(attribute);
            attr.value = attrValue;
            element.setAttributeNode(attr);
        }
    } else {
        document.querySelector("body").appendChild(element);
        if (attribute != "" || attrValue != "") {
            let attr = document.createAttribute(attribute);
            attr.value = attrValue;
            element.setAttributeNode(attr);
        }
    }
}