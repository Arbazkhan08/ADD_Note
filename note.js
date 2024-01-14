const addBtn = document.querySelector("#addbtn")
const main  = document.querySelector("#main")

const saveNotes=()=>{
    const notes = document.querySelectorAll(".notes textarea")
    const data=[];
    notes.forEach(
        (note) =>{
            data.push(note.value)
        }
    )
    if(data.length === 0){
        localStorage.removeItem("notes")
    }
    else{
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

addBtn.addEventListener("click", function(){
    addNote()
    }
)

const addNote =( text = "")=>{
   const note = document.createElement("div") 
   note.classList.add("notes") //div ka class hai notes class add karne ke liye bote.addclasslist notes
   note.innerHTML =` 
   <div class="tool">
   <i class="save fa-solid fa-floppy-disk"></i>
   <i class="trash fa-solid fa-trash"></i>
   </div> 
<textarea>${text}</textarea>`;

    note.querySelector(".trash").addEventListener(
        "click", function(){
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click", function(){
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
           saveNotes() 
        }
    )
    main.appendChild(note)
    saveNotes() //add a new child node to an html
}

(
    function(){
        const lsnotes=JSON.parse(localStorage.getItem("notes"));
        if(lsnotes === null){
            addNote()
        }else{
            lsnotes.forEach(
                 (lsnotes)=>{
                     addNote(lsnotes)
                }
            )
        }
    }
)()//call a function