const del = document.querySelector("#del");

const deleteBtn = document.querySelector("#delete-btn");

function handleDelAnimationEnd() {
    del.removeAttribute("class");
    if (shouldNavigateAway) {
      location.href = "/";
    }
  }

async function deleteWorkout() {
    const lastWorkout = await API.getLastWorkout();
    console.log("Deleted workout:", lastWorkout);
    if (lastWorkout) {
      document
        .querySelector("a[href='/delete?']")
        .setAttribute("href", `/delete?id=${lastWorkout._id}`)
    }
    API.deleteWorkoutAPI()
    del.classList.add("success");
    del.addEventListener("animationend", handleDelAnimationEnd);
  }
  
deleteBtn.addEventListener("click",deleteWorkout);
