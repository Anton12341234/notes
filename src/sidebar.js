export default function SideBar({setDisabledText,setText,disabledText,text}){
    return(
      <div onClick={()=>setDisabledText(false)} className='right_box'>
            <textarea 
            spellCheck="true" 
            className='text'
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={disabledText}
            ></textarea>
          </div>
    )
  }