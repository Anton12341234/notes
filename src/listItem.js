export default function ListItem({notes,onclickNote}){
    return(
     <div className='left_box'>
              {notes.map((el)=>{
                let newText= el.text.length>20?el.text.substring(0, 20)+'...':el.text;
                return <div key={el.id} onClick={()=>{onclickNote(el.id)}} className='notes'><h4>{newText}</h4><br/>{el.date.substring(0, 17)}</div>
              })}
     </div>
    )
  }