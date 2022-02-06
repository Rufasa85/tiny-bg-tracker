const aside = document.querySelector("aside")
const gameTitle = document.querySelector("#gameTitle")
const gameBlocks = document.querySelectorAll(".gameBlock")
const newNoteForm = document.querySelector("#newNote");
const notesList = document.querySelector("#notesList")
const newPlayForm = document.querySelector("#newPlay");
const playsList = document.querySelector("#playsList")

const loadGameData = id => {
    fetch(`/api/games/${id}`).then(res => res.json()).then(data => {
        aside.classList.remove("hidden")
        console.log(data)
        gameTitle.textContent = data.name
            //show notes
        newNoteForm.querySelector("input[type=hidden]").value = data.id
        notesList.innerHTML = "";
        if (!data.Notes.length) {
            notesList.innerHTML = `<div class="notesCard"><p>No notes yet!</p></div>`
        } else {
            notesList.innerHTML = `<h4>Notes:</h4>`
            data.Notes.forEach(note => {
                const newNote = `<div class="notesCard"><form class="editForm nodisp">  <input type="hidden" name="gameId" value=${data.id}>
                <input type="hidden" name="playId" value=${note.PlayId}> <input type="hidden" name="noteId" value=${note.id}><textarea>${note.text}</textarea><button>Save</button></form><p>${note.text}</p><button data-gameid=${data.id} data-playid=${note.id} class="edit">Edit</button><button data-gameid=${data.id} data-playid=${note.id} class="delete">Delete</button></div>`
                notesList.innerHTML += newNote
            })
        }
        //show plays
        playsList.innerHTML = "";
        newPlayForm.querySelector("input[type=hidden]").value = data.id;
        newPlayForm.querySelector("input[type=date]").value = new Date().toISOString().substring(0, 10);
        if (!data.Plays.length) {
            playsList.innerHTML = `<div class="playCard"><p>No plays yet!</p></div>`
        } else {
            playsList.innerHTML = `<h4>Plays:</h4>`
            data.Plays.forEach(p => {
                const playCard = document.createElement("div")
                playCard.classList.add("playCard")

                const joeScore = document.createElement("h4");
                const arraScore = document.createElement("h4");

                joeScore.textContent = `Joe score: ${p.joeScore}`
                arraScore.textContent = `Arra score: ${p.arraScore}`

                p.joeScore > p.arraScore ? joeScore.classList.add("winner") : p.joeScore < p.arraScore ? arraScore.classList.add("winner") : null
                playCard.append(joeScore)
                playCard.append(arraScore)

                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.dataset.playid = p.id;
                editBtn.dataset.gameid = data.id;
                editBtn.classList.add("edit")

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.dataset.playid = p.id;
                deleteBtn.dataset.gameid = data.id;
                deleteBtn.classList.add("delete")
                playCard.innerHTML += `<form action="" class="editForm nodisp">
                <input type="hidden" name="gameId" value=${data.id}>
                <input type="hidden" name="playId" value=${p.id}>
                <label for="">Joe Score</label>
                <input type="number" name="joeScore" id="" value=${p.joeScore}>
                <label for="">Arra Score</label>
                <input type="number" name="arraScore" id=""  value=${p.arraScore}>
                <label for="">date played</label>
                <input type="date" name="playedOn" id="" value=${new Date(p.playedOn).toISOString().substring(0, 10)}>
                <button>save play</button>
            </form>`
                playCard.append(editBtn)
                playCard.append(deleteBtn)
                const playNotes = document.createElement("div");
                playNotes.classList.add("playNotes");
                playCard.innerHTML += ` <form action="" class="newPlayNote">
                <input type="hidden" name="gameId" value=${data.id}>
                <input type="hidden" name="playId" value=${p.id}>
                <textarea name="text" id="" placeholder="new play note"></textarea>
                <button>save note on this play</button>
            </form>`
                if (!p.Notes.length) {
                    playNotes.innerHTML += `<div class="playNoteCard">
                    <p>no notes on this play!</p>
                </div>`
                } else {
                    playNotes.innerHTML += "<h4>Notes on this play:</h4>"
                    p.Notes.forEach(n => {

                        playNotes.innerHTML += `<div class="playNotesCard"><form action="" class="editPlayNote nodisp">
                        <input type="hidden" name="gameId" value=${data.id}>
                        <input type="hidden" name="playId" value=${p.id}>
                        <input type="hidden" name="noteId" value=${n.id}>
                        <textarea name="text" id="" placeholder="new play note">${n.text}</textarea>
                        <button>save note on this play</button>
                    </form><p>${n.text}</p><button data-gameid=${data.id} data-noteid=${n.id} class="edit playNote">Edit</button><button data-gameid=${data.id} data-noteid=${n.id} class="delete playNote">Delete</button></div>`
                    })
                }
                playCard.append(playNotes)
                playsList.append(playCard)

            })
        }


    })
}

gameBlocks.forEach(block => {
    block.addEventListener("click", e => {
        loadGameData(block.dataset.gameid)
    })
})

newPlayForm.addEventListener("submit", e => {
    e.preventDefault();
    const newPlayObj = {
        joeScore: newPlayForm.querySelector("input[name=joeScore]").value,
        arraScore: newPlayForm.querySelector("input[name=arraScore]").value,
        playedOn: newPlayForm.querySelector("input[type=date]").value,
        gameId: newPlayForm.querySelector("input[type=hidden]").value
    }
    fetch("/api/plays", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPlayObj)
    }).then(res => res.json()).then(data => {
        newPlayForm.querySelector("input[name=joeScore]").value = ""
        newPlayForm.querySelector("input[name=arraScore]").value = ""
        loadGameData(newPlayObj.gameId)
    })
    console.log(newPlayObj)
})

newNoteForm.addEventListener("submit", e => {
    e.preventDefault();
    const newNoteObj = {
        text: newNoteForm.querySelector("textarea").value,
        GameId: newNoteForm.querySelector("input[type=hidden]").value
    }
    fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newNoteObj)
    }).then(res => res.json()).then(data => {

        newNoteForm.querySelector("textarea").value = ""
        loadGameData(newNoteObj.GameId)
    })
    console.log(newNoteObj)
})

playsList.addEventListener("submit", e => {
    e.preventDefault()
    console.log("e.target", e.target)
    if (e.target.matches("form.editForm")) {
        console.log("edit form submit!")
        const editPlayObj = {
            joeScore: e.target.querySelector("input[name=joeScore]").value,
            arraScore: e.target.querySelector("input[name=arraScore]").value,
            GameId: e.target.querySelector("input[name=gameId]").value,
            PlayId: e.target.querySelector("input[name=playId]").value
        }
        console.log(editPlayObj)
        fetch(`/api/plays/${editPlayObj.PlayId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editPlayObj)
        }).then(res => res.json()).then(data => {

            joeScore = e.target.querySelector("input[name=joeScore]").value = ""
            arraScore = e.target.querySelector("input[name=arraScore]").value = ""
            loadGameData(editPlayObj.GameId)
        })
        console.log(editPlayObj);
    } else if (e.target.matches("form.editPlayNote")) {
        const editNoteObj = {
            text: e.target.querySelector("textarea").value,
            GameId: e.target.querySelector("input[name=gameId]").value,
            PlayId: e.target.querySelector("input[name=playId]").value,
            noteId: e.target.querySelector("input[name=noteId]").value,
        }
        fetch(`api/notes/${editNoteObj.noteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editNoteObj)
        }).then(res => res.json()).then(data => {

            e.target.querySelector("textarea").value = ""
            loadGameData(editNoteObj.GameId)
        })
        console.log(editNoteObj);
    } else if (e.target.matches("form")) {
        const newNoteObj = {
            text: e.target.querySelector("textarea").value,
            GameId: e.target.querySelector("input[name=gameId]").value,
            PlayId: e.target.querySelector("input[name=playId]").value
        }
        fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNoteObj)
        }).then(res => res.json()).then(data => {

            e.target.querySelector("textarea").value = ""
            loadGameData(newNoteObj.GameId)
        })
        console.log(newNoteObj);
    }
})
notesList.addEventListener("submit", e => {
    e.preventDefault()
    console.log("e.target", e.target)
    if (e.target.matches("form.editForm")) {
        console.log("edit form submit!")
        const editNoteObj = {
            text: e.target.querySelector("textarea").value,
            GameId: e.target.querySelector("input[name=gameId]").value,
            NoteId: e.target.querySelector("input[name=noteId]").value
        }
        const playId = e.target.querySelector("input[name=playId]").value;
        console.log(playId === "null");
        playId !== "null" ? editNoteObj.PlayId = playId : null
        console.log(editNoteObj)
        fetch(`/api/notes/${editNoteObj.NoteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editNoteObj)
        }).then(res => res.json()).then(data => {
            newNoteForm.querySelector("textarea").value = ""
            loadGameData(editNoteObj.GameId)
        })
        console.log(editNoteObj);
    }
})

notesList.addEventListener("click", e => {
    if (e.target.matches(".edit")) {
        console.log("edit click")
        console.log(e.target.parentNode)
        e.target.parentNode.querySelector("form").classList.remove("nodisp");
        e.target.parentNode.querySelector("p").classList.add("nodisp")
    } else if (e.target.matches(".delete")) {
        console.log(e.target)
        fetch(`/api/notes/${e.target.dataset.playid}`, {
            method: "DELETE"
        }).then(res => res.json()).then(data => {
            loadGameData(e.target.dataset.gameid)
        })
    }
})
playsList.addEventListener("click", e => {
    if (e.target.matches(".edit.playNote")) {
        e.target.parentNode.querySelector("form").classList.remove("nodisp");
        e.target.parentNode.querySelector("p").classList.add("nodisp")
    } else if (e.target.matches(".delete.playNote")) {
        fetch(`/api/notes/${e.target.dataset.noteid}`, {
            method: "DELETE"
        }).then(res => res.json()).then(data => {
            loadGameData(e.target.dataset.gameid)
        })
    } else if (e.target.matches(".edit")) {
        console.log("edit click")
        console.log(e.target.parentNode.children)
        const toHide = e.target.parentNode.children;
        for (let i = 0; i < toHide.length; i++) {
            const element = toHide[i];
            element.classList.add("nodisp")
        }
        e.target.parentNode.querySelector("form").classList.remove("nodisp");
    } else if (e.target.matches(".delete")) {
        console.log(e.target)
        fetch(`/api/plays/${e.target.dataset.playid}`, {
            method: "DELETE"
        }).then(res => res.json()).then(data => {
            loadGameData(e.target.dataset.gameid)
        })
    }
})