const API = "https://retoolapi.dev/fZp18N/data"
let currentBuildin = 'A'
let currentToilet = 'Male'
let currentFloor = 0;
let totalFloors = 2;
let isAnimating = false;
let animationDuration = 300
let floorsContainer
let currentFloorDisplay

document.addEventListener('DOMContentLoaded', () => {
    floorsContainer = document.getElementById('floorsContainer');
    currentFloorDisplay = document.getElementById('currentFloorDisplay');

    createFloorNav()
});

window.addEventListener("load", setAspectRatioForPlans);
window.addEventListener("load", onSelectionChange);
document.querySelectorAll('input[name="building"], input[name="toilet"]').forEach(inp => inp.addEventListener("change", onSelectionChange));


const reportModal = document.getElementById('reportModal');
reportModal.addEventListener('show.bs.modal', (event) => {
    const btn = event.relatedTarget;
    const item = btn.getAttribute('data-item') || '';
    document.getElementById('itemField').value = item;
});

document.getElementById('reportForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const itemField = document.getElementById('itemField');
    const textarea = document.getElementById('reportDescription');

    if (textarea.value.length > 0 && textarea.value != null) {
        fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                dataItem: itemField.value,
                message: textarea.value,
                building: currentBuildin,
                toilet: currentToilet,
                floor: currentFloor
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Report submitted:', data);
            document.getElementById('reportForm').reset();
            const modalInstance = bootstrap.Modal.getInstance(reportModal);
            modalInstance.hide();
        })
        .catch(error => console.error('Error:', error));
    }
    else {
        alert("Invalid message!");
    }

});


const toiletDict = {
    "A_Male": {
        src: "/Building_A_Male_Toilet_ALL_IN_ALL.svg",
        buttons: [
            { left: 3.65, top: 10, width: 6.25, height: 18, data_item: "Mop Bucket" },
            { left: 13.25, top: 10, width: 12.75, height: 18, data_item: "Hand Wash #1" },
            { left: 19.25, top: 28.25, width: 5, height: 19, data_item: "Towel Dispenser" },
            { left: 5, top: 28.75, width: 9, height: 20, data_item: "Staff Hand Wash #1" },

            { left: 15.75, top: 90, width: 10, height: 18, data_item: "Hand Wash #2" },
            { left: 5.75, top: 90, width: 10, height: 18, data_item: "Hand Wash #3" },

            { left: 87.5, top: 17.5, width: 23.5, height: 30, data_item: "Toilet #1" },
            { left: 87.5, top: 51, width: 23.5, height: 30, data_item: "Toilet #2" },
            { left: 87.5, top: 83.5, width: 23.5, height: 30, data_item: "Toilet #3" },

            { left: 33.5, top: 16, width: 15, height: 30, data_item: "Urina #1" },
            { left: 48.25, top: 16, width: 15, height: 30, data_item: "Urina #2" },
            { left: 63, top: 16, width: 15, height: 30, data_item: "Urina #3" }
        ]
    },

    "A_Female": {
        src: "/Building_A_Female_Toilet_ALL_IN_ALL.svg",
        buttons: [
            { left: 63.5, top: 10.25, width: 9.5, height: 18, data_item: "Mop Bucket" },

            { left: 76.25, top: 39.5, width: 15, height: 18, data_item: "Hand Wash #1" },
            { left: 91, top: 39.5, width: 15, height: 18, data_item: "Hand Wash #2" },

            { left: 95, top: 61.75, width: 8, height: 19, data_item: "Towel Dispenser" },

            { left: 19, top: 17.5, width: 36, height: 30, data_item: "Toilet #1" },
            { left: 19, top: 51, width: 36, height: 30, data_item: "Toilet #2" },
            { left: 19, top: 83.5, width: 36, height: 30, data_item: "Toilet #3" }
        ]
    },

    "B_Male": {
        src: "/Building_B_Male_Toilet_ALL_IN_ALL.svg",
        buttons: [
            { left: 6, top: 4.5, width: 12, height: 8, data_item: "Mop Bucket" },
            { left: 23.5, top: 4.5, width: 12.5, height: 8, data_item: "Towel Dispenser" },

            { left: 8.5, top: 28.5, width: 14, height: 14, data_item: "Hand Wash #1" },
            { left: 22.5, top: 28.5, width: 14, height: 14, data_item: "Hand Wash #2" },

            { left: 84.5, top: 13, width: 29.5, height: 23.75, data_item: "Toilet #1" },
            { left: 84.5, top: 37.75, width: 29.5, height: 23.75, data_item: "Toilet #2" },
            { left: 84.5, top: 62.25, width: 29.5, height: 23.75, data_item: "Toilet #3" },
            { left: 84.5, top: 86.75, width: 29.5, height: 23.75, data_item: "Toilet #4" },

            { left: 45, top: 40.75, width: 15, height: 20, data_item: "Urina #1" },
            { left: 45, top: 61.75, width: 15, height: 20, data_item: "Urina #2" },
            { left: 45, top: 82.75, width: 15, height: 20, data_item: "Urina #3" }
        ]
    },

    "B_Female": {
        src: "/Building_B_Female_Toilet_ALL_IN_ALL.svg",
        buttons: [
            { left: 6, top: 4.5, width: 12, height: 8, data_item: "Mop Bucket" },
            { left: 23.5, top: 4.5, width: 12.5, height: 8, data_item: "Towel Dispenser" },

            { left: 8.5, top: 28.5, width: 14, height: 14, data_item: "Hand Wash #1" },
            { left: 22.5, top: 28.5, width: 14, height: 14, data_item: "Hand Wash #2" },

            { left: 84.5, top: 13, width: 29.5, height: 23.75, data_item: "Toilet #1" },
            { left: 84.5, top: 37.75, width: 29.5, height: 23.75, data_item: "Toilet #2" },
            { left: 84.5, top: 62.25, width: 29.5, height: 23.75, data_item: "Toilet #3" },
            { left: 84.5, top: 86.75, width: 29.5, height: 23.75, data_item: "Toilet #4" }
        ]
    }
}


function createFloorButtons() {
    floorsContainer.innerHTML = "";
    for (let i = totalFloors; i >= 0; i--) {
        const floorBtn = document.createElement('div');
        floorBtn.className = 'floor-item';
        floorBtn.textContent = i;
        floorBtn.dataset.floor = i;

        if (i === currentFloor) {
            floorBtn.classList.add('active');
        }

        floorBtn.addEventListener('click', () => goToFloor(i));
        floorsContainer.appendChild(floorBtn);
    }
}

function handleScroll(e) {
    e.preventDefault();

    if (isAnimating) return;

    if (e.deltaY < 0) {
        goToFloor(Math.min(currentFloor + 1, totalFloors));
    } else if (e.deltaY > 0) {
        goToFloor(Math.max(currentFloor - 1, 0));
    }
}

function handleTouch(e) {
    e.preventDefault();

    let touchStart = e.touches[0].clientY;

    const touchEndListener = (endEvent) => {
        if (isAnimating) return;

        const touchEnd = endEvent.changedTouches[0].clientY;
        const diff = touchStart - touchEnd;

        const threshold = 50;

        if (diff > threshold) {
            goToFloor(Math.max(currentFloor - 1, 0));
        } else if (diff < -threshold) {
            goToFloor(Math.min(currentFloor + 1, totalFloors));
        }

        document.removeEventListener('touchend', touchEndListener);
    };

    document.addEventListener('touchend', touchEndListener);
}

function handleKeyboard(e) {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToFloor(Math.min(currentFloor + 1, totalFloors));
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToFloor(Math.max(currentFloor - 1, 0));
    }
}

function goToFloor(floorNumber) {
    if (floorNumber === currentFloor) return;

    isAnimating = true;
    currentFloor = floorNumber;

    updateActiveButton();
    updateFloorDisplay();

    setTimeout(() => {
        isAnimating = false;
    }, animationDuration);
}

function updateActiveButton() {
    const floorItems = document.querySelectorAll('.floor-item');
    floorItems.forEach((item) => {
        if (parseInt(item.dataset.floor) === currentFloor) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

function updateFloorDisplay() {
    currentFloorDisplay.textContent = `Floor ${currentFloor}`;
}



function createFloorNav() {
    createFloorButtons();
    document.addEventListener('wheel', (e) => handleScroll(e), { passive: false });
    document.addEventListener('touchmove', (e) => handleTouch(e), { passive: false });
    document.addEventListener('keydown', (e) => handleKeyboard(e));
    updateFloorDisplay();
}





function setAspectRatioForPlans() {
    const wrap = document.querySelector(".plan-wrap");
    const img = wrap.querySelector(".plan-img");
    if (!img) return;

    const apply = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        if (!w || !h) return;

        if (w > 0 && h > 0) {
            wrap.style.setProperty("--iw", w);
            wrap.style.setProperty("--ih", h);
            wrap.style.setProperty("--ar", (w / h).toString());
        } else {
            wrap.style.setProperty("--ar", "1");
        }
    };

    if (img.complete) apply();
    else img.addEventListener("load", apply, { once: true });
}



function onSelectionChange() {
    const building = document.querySelector(`input[name="building"]:checked`)?.value;
    const gender = document.querySelector(`input[name="toilet"]:checked`)?.value;

    currentBuildin = building
    currentToilet = gender

    if (building == 'A') {
        totalFloors = 2
        createFloorButtons()
    }

    if (building == 'B') {
        totalFloors = 3
        createFloorButtons()
    }

    renderPlan(building, gender);
}


function renderPlan(building, gender) {
    const key = `${building}_${gender}`;
    const plan = toiletDict[key];

    let rotationDeg = '-90deg'

    if (key == 'A_Female') {
        rotationDeg = '90deg'
    }

    const wrap = document.getElementById("plan_wrap");
    wrap.innerHTML = "";
    wrap.style.setProperty("--rotation", rotationDeg)

    if (!plan) {
        wrap.textContent = "No plan found for this selection.";
        return;
    }

    const img = document.createElement("img");
    img.className = "plan-img";
    img.alt = `Plan ${building} ${gender}`;
    img.src = plan.src;
    wrap.appendChild(img);

    plan.buttons.forEach(button => {
        const btn = document.createElement("button");
        btn.className = `pin btn btn-sm`;

        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#reportModal");
        btn.setAttribute("data-item", button.data_item);

        btn.style.left = `${button.left}%`;
        btn.style.top = `${button.top}%`;
        btn.style.height = `${button.height}%`;
        btn.style.width = `${button.width}%`;

        btn.setAttribute("data-bs-toggle", "modal");
        btn.setAttribute("data-bs-target", "#reportModal");
        btn.setAttribute("data-item", button.data_item);

        wrap.appendChild(btn);
    });

    // After the new image loads, re-apply aspect ratio variables (for perfect sizing)
    img.addEventListener("load", () => {
        setAspectRatioForPlans()
    }, { once: true });
}
